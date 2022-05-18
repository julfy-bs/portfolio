<template>
  <section class="admin-section profile">
    <h1 class="admin-section__title">
      Profile
    </h1>
    <div class="admin-section__wrapper">
      <div class="profile__wrapper ">
        <admin-profile-edit-info />
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>

import AdminProfileEditInfo from '@/components/AdminProfileEdit/AdminProfileEdit.vue'

</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.profile {
  display: flex;
  justify-content: center;

  .profile__wrapper {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;
  }

}
</style>
