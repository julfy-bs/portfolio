<template>
  <admin-header />
  <main class="admin-main">
    <div class="container">
      <router-view />
    </div>
  </main>
</template>

<script setup lang='ts'>
import AdminHeader from '@/components/AdminHeader/AdminHeader.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.admin-main {
  position: relative;
}
</style>
