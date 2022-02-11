<template>
  <div class="admin__wrapper">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage'
}
</script>

<style scoped>
.admin__wrapper {
  background: 100% 20% / cover no-repeat url("../static/images/dialog-background.png");
}
</style>
