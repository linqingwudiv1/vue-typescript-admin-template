<template>
  <div>
    <router-view />
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'default'
})
export default class extends Vue {}

</script>
