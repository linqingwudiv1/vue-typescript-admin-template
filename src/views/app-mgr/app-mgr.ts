import { getAppInfos } from '@/api/appmgr';
import { cloneDeep } from 'lodash'
import { Component, Vue } from 'vue-property-decorator'

interface IQuery
{
    pageNum:number,
    pageSize: number,
    data:{
        appName :''
    }
}

const default_query:IQuery = 
{
    pageNum: 1,
    pageSize: 20,
    data: {
    appName: ""
    }
};

@Component({
    name: 'AppMgrView',
    components: {
    }
  })
 export default class AppMgrView extends Vue 
 {
     private appinfo_data:any = [];
     private query:IQuery = Object.assign({}, default_query);
     async mounted() {
        let {data} = await getAppInfos(this.query);
        console.log(data);
    }

     
 }