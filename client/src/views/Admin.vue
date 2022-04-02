<template>
  <admin-header />
  <admin-navigation />
  <main class="admin-main">
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'

export default {
  name: 'AdminPage',
  components: {
    AdminHeader, AdminNavigation
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.admin-main {
  background: $admin-gradient, 100% 34% / cover no-repeat url("../static/images/dialog-background.png");;
  min-height: calc(100vh - 80px - 80px);
  padding-top: 60px;
}
</style>
