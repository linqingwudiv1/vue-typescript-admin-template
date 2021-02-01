<template>
  <div class="dashboard-container">
    <component :is="currentRole" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { UserModule } from '@/store/modules/user'
import AdminDashboard from './admin/index.vue'
import EditorDashboard from './editor/index.vue'

@Component({
  name: 'Dashboard',
  components: {
    AdminDashboard,
    EditorDashboard
  }
})
export default class extends Vue {
  private currentRole = 'admin-dashboard'

  get roles() {
    return UserModule.roles
  }

  created() {
    //console.log(this.roles, 'vue ');
    this.currentRole = 'admin-dashboard';
    //if (this.roles.findIndex( x=> x.key == 1) <= -1) {
    //  this.currentRole = 'editor-dashboard'
    //}
  }
}
</script>
