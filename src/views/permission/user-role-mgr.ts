import { getRoles } from '@/api/roles';
import { getUsers, updateUserRoles } from '@/api/userRole';
import { table } from 'console';
import { ElTable } from 'element-ui/types/table';
import { clone, cloneDeep } from 'lodash'
import { userInfo, UserInfo } from 'os';
import { Component, Vue } from 'vue-property-decorator'


/**
 * 
 */
interface IUserInfo
{
  id:number;
  name:string;
  username:string;
  phone:string;
  email:string;
  avatar:string;
  introduction:string;
  roles:any[]
}

interface IRole
{
  bCheck:boolean,
  key:number,
  name:string,
  displayName:string
}

/**
 * 
 */
interface IQuery {
  pageNum: number,
  pageSize: number,
  data: {
    searchWord: string,
    bId       : boolean,
    bUserName : boolean,
    bPassport : boolean,
    bEmail    : boolean,
    bPhone    : boolean
  }
}

const default_query: IQuery =
{
  pageNum: 1,
  pageSize: 10,
  data: {
    searchWord: '',
    bId       : true,
    bUserName : true,
    bPassport : true,
    bEmail    : true,
    bPhone    : true
  }
};

const default_user: IUserInfo =
{
  id:-1,
  name:'',
  username:'',
  phone:'',
  email:'',
  avatar:'',
  introduction:'',
  roles:[]
};

@Component({
  name: 'UserRoleMgr'
})
export default class extends Vue {

  /**
   * 
   */
  private data_users:Array<IUserInfo> = [];
  
  /**
   * 
   */
  private data_roles:Array<IRole> = [];

  private edit_user:IUserInfo = cloneDeep(default_user);

  /**
   * 
   */
  private total_data:number = 0;
  
  /**
   * 
   */
  private query:IQuery = Object.assign({}, default_query);

  /**
   * 
   */
  private dialog:{ bShowRoleList:boolean } = 
  {
    bShowRoleList: false
  } 
  private loading: any = {
    bLoadingMainTable: false,
  };

  async mounted() {
    await this.http_getUsers();
    await this.http_getRoles();
  }

  //#region http
  async http_getUsers()
  {
    let query_copy = cloneDeep(this.query);
    query_copy.data.searchWord = query_copy.data.searchWord.toLocaleLowerCase().trim();

    let res:any = await getUsers(this.query);
    
    this.data_users = res.data;
    this.total_data = res.total;
  }

  /**
   * 
   */
  async http_getRoles()
  {
    const { data } = await getRoles({/** */});
    
    this.data_roles = data;
  }

  //#endregion
  
  //#region event
  async on_current_change_main()
  {
    await this.http_getUsers();
  }

  //#region event

  async onclick_search()
  {
    await this.http_getUsers();
  }
  
  async onclick_openEdit(user:IUserInfo)
  {
    this.edit_user = cloneDeep(user);
    this.dialog.bShowRoleList = true;
    
    this.$nextTick( ()=>
    {
      let table = (this.$refs.table_roles as ElTable);
      table.clearSelection();
      for (let item of this.data_roles )
      {
        if ( user.roles.findIndex( (x:IRole)=> { return x.key == item.key } ) > -1 )
        {
          table.toggleRowSelection(item);
        }
      }
    });
  }

  /** */
  async onclick_submitEdit()
  {
    let table = (this.$refs.table_roles as any);

    if (!table)
    {
      console.error(`不存在 Table`);
    }

    let old_role = this.edit_user.roles.map( (x:any) => x.key);
    let new_role = table.selection.map( (x:any) => x.key);
    const includes = (arr1:Array<any>, arr2:Array<any>)=> {
      return arr2.every(val => arr1.includes(val));
    };

    if ( old_role.length != new_role.length || 
         !includes(old_role, new_role))
    {

      await updateUserRoles({users: [this.edit_user.id], roles:new_role  });
      this.$message({type:'success', message:'修改权限成功...'});
  
      
      let idx = this.data_users.findIndex( (x:IUserInfo) => {return x.id === this.edit_user.id } );
      this.edit_user.roles = table.selection.map( (x:any) => {return { key: x.key, name: x.name, displayName: x.displayName}});
      this.$set(this.data_users, idx, this.edit_user);  
    }
    else 
    {
      this.$message({type:'warning', message:'权限无改变'});
    }


    this.dialog.bShowRoleList = false;

    // this.$set()
  }

  //#endregion

}