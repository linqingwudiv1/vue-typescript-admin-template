<template>
  <div class="markdown-editor-com">
    <div :id="id"></div>
    <el-dialog width="400px" v-bind:visible.sync="bShowUploading">
      <el-upload
        v-if="bShowUploading"
        action="#"
        ref="image_uploader"
        drag
        multiple
        accept="image/*"
        :on-change="onchange_imageFile"
        :http-request="http_request_uploading"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png等图片文件</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<style lang="stylus" scoped>
.markdown-editor-com {
  padding: 0;
}
</style>
<script lang="ts">
import "codemirror/lib/codemirror.css"; // codemirror
import "tui-editor/dist/tui-editor.css"; // editor ui
import "tui-editor/dist/tui-editor-contents.css"; // editor content
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import defaultOptions from "./default-options";
import TuiEditor from "tui-editor";
import { Element } from "driver.js";
import axios from "node_modules/axios";
import { GConst } from "@/Global/GConst";
import { NewCOS } from "@/utils/cos";
import moment from 'moment'

const defaultId = () =>
  "markdown-editor-" + +new Date() + ((Math.random() * 1000).toFixed(0) + "");

@Component({
  name: "MarkdownEditor",
})
export default class extends Vue {
  @Prop({ required: true }) private value!: string;
  @Prop({ default: defaultId }) private id!: string;
  @Prop({ default: () => defaultOptions })
  private options!: tuiEditor.IEditorOptions;
  @Prop({ default: "markdown" }) private mode!: string;
  @Prop({ default: "300px" }) private height!: string;
  // https://github.com/nhnent/tui.editor/tree/master/src/js/langs
  @Prop({ default: "en_US" }) private language!: string;
  @Prop({ default: "asset/img" }) private basekey!: string;

  /** */
  private markdownEditor?: tuiEditor.Editor;
  /** */
  private bShowUploading: boolean = false;
  /** */
  private loading: any = {
    bUploading: false,
  };

  get editorOptions() {
    const options = Object.assign({}, defaultOptions, this.options);
    options.initialEditType = this.mode;
    options.height = this.height;
    options.language = this.language;
    return options;
  }

  @Watch("value")
  private onValueChange(value: string, oldValue: string) {
    if (this.markdownEditor) {
      if (value !== oldValue && value !== this.markdownEditor.getValue()) {
        this.markdownEditor.setValue(value);
      }
    }
  }

  @Watch("language")
  private onLanguageChange() {
    this.destroyEditor();
    this.initEditor();
  }

  @Watch("height")
  private onHeightChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.height(value);
    }
  }

  @Watch("mode")
  private onModeChange(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.changeMode(value);
    }
  }

  mounted() {
    this.initEditor();
  }

  destroyed() {
    this.destroyEditor();
  }

  private initEditor() {
    const editorElement = document.getElementById(this.id);
    if (!editorElement) return;
    this.markdownEditor = new TuiEditor({
      el: editorElement,
      ...this.editorOptions,
    });
    if (this.value) {
      this.markdownEditor.setValue(this.value);
    }
    this.markdownEditor.on("change", () => {
      if (this.markdownEditor !== undefined) {
        this.$emit("input", this.markdownEditor.getValue());
      }
    });

    //----------------新增↓
    /*
     * 添加自定义按钮
     * */
    //获取编辑器上的功能条

    let toolbar = this.markdownEditor.getUI().getToolbar();
    //let fileDom = this.$refs.files;
    //添加事件
    let mgr = (this.markdownEditor as any).eventManager;

    mgr.addEventType("click_uploadImage");
    mgr.listen("click_uploadImage", () => {
      this.bShowUploading = true;
    });

    (toolbar.insertItem as any)(15, {
      type: "button",
      options: {
        className: "tui-image",
        event: "click_uploadImage",
        tooltip: "Insert Image",
        text: "",
      },
    });
  }

  private destroyEditor() {
    if (!this.markdownEditor) return;
    this.markdownEditor.off("change");
    this.markdownEditor.remove();
    this.markdownEditor = undefined;
  }

  public focus() {
    if (this.markdownEditor) {
      this.markdownEditor.focus();
    }
  }

  public setValue(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.setValue(value);
    }
  }

  public getValue() {
    if (this.markdownEditor) {
      return this.markdownEditor.getValue();
    }
    return "";
  }

  public setHtml(value: string) {
    if (this.markdownEditor) {
      this.markdownEditor.setHtml(value);
    }
  }

  public getHtml() {
    if (this.markdownEditor) {
      return this.markdownEditor.getHtml();
    }
    return "";
  }

  /**
   *
   * @param data
   */
  async http_request_uploading(data: any) {
    let file: File = data.file;
    console.log(file);
    let cos = NewCOS();

    const cos_key = `${this.basekey}/img/${moment().format('YYYYMMDD_HH_mm_ss')}-${file.name}`;
    
    cos.putObject(
      {
        Key: cos_key /* 必须 */,
        Bucket: GConst.COSBucket, // Bucket 格式：test-1250000000
        Region: GConst.COSRegion,
        Body: file,
        onTaskReady: (progressData) => {
          this.loading.bUploading = true;
        },
        onProgress: async (progressData) => {
          // this.$emit("on-setup-progress", progressData.percent);
        },
      },
      async (err, res) => {
        if (err) {
          this.$message({ type: "error", message: err.message });
        } else {
          let url = await cos.getObjectUrl(
            {
              Key: cos_key,
              Bucket: GConst.COSBucket,
              Region: GConst.COSRegion,
            },
            () => {}
          );

          this.addImgToMd(url);
        }
      }
    );
  }

  async onchange_imageFile(file: any, fileList: any) {
    console.log(' onchange_imageFile ');
    await this.http_request_uploading({file :file.raw});
    //(this.$refs["image_uploader"] as any).submit();
  }

  // //添加图片到markdown
  addImgToMd(data: any) {
    try {
      let editor = this.markdownEditor!.getCodeMirror();
      let editorHtml:any = this.markdownEditor!.getCurrentModeEditor();
      let isMarkdownMode = this.markdownEditor!.isMarkdownMode();

      if (isMarkdownMode) {
        editor!.replaceSelection(`![img](${data})\r\n`);
        editor!.replaceSelection('<br/>\r\n ')
      } else {
        let range = editorHtml.getRange();
        let img = document.createElement("img");
        img.src = `${data}`;
        img.alt = "img";
        range.insertNode(img);
        range.insertNode( document.createElement("br"));
        
      }
      this.bShowUploading = false;
      this.$message({type:'success', message:'图片上传成功......'});
    } catch (err) {
      this.bShowUploading = false;
      this.$message({type:'error', message:`${err}`})
      console.error(err);
    }
  }
  //#endregion
}
</script>
