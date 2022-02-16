<template>
  <admin-header />
  <admin-navigation />
  <main class="admin-main">
    <div class="container">
      <h1>works</h1>
    </div>
  </main>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminNavigation from '@/components/AdminNavigation.vue'

export default {
  name: 'AdminWorksPage',
  components: {
    AdminHeader, AdminNavigation
  }
}
</script>

<style lang='scss' scoped>
.admin-main {
  background: $admin-gradient, 100% 34% / cover no-repeat url("../static/images/dialog-background.png");;
  min-height: calc(100vh - 80px - 80px);
}
</style>
