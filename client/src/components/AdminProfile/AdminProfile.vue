<template>
  <section class="admin-section profile">
    <h1 class="admin-section__title">
      Profile
    </h1>
    <div class="admin-section__wrapper">
      <admin-profile-edit />
    </div>
  </section>
</template>

<script setup lang='ts'>

import AdminProfileEdit from '@/components/AdminProfileEdit/AdminProfileEdit.vue'

</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.profile {
  display: flex;
  justify-content: center;
}
</style>
