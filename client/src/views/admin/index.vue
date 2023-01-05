<template>
  <admin-header
    v-if="userLogged"
  />
  <main
    class="admin-main"
    :class="{'with-header': userLogged}"
  >
    <router-view />
  </main>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

// todo: store for login
const userLogged = ref<boolean>(true)
import AdminHeader from '@/components/AdminHeader/AdminHeader.vue'
</script>

<style lang='scss'>
@import "../../assets/styles/variables";

.admin-main {
  position: relative;
  background-color: $bg;
  transition: color .5s, background-color .5s;
  
  
  &.with-header {
    @media (min-width: $tablets-big) {
      padding-top: $header-height;
    }
  }
}

.admin-section {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.admin-section__title {
  font-size: 38px;
  letter-spacing: -.02em;
  font-weight: 600;
  margin-bottom: 1rem;
  color: $text-1;
  transition: color 0.25s;
}

.admin-section__wrapper {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  width: 100%;
  min-width: $screen-min-width;
  border: 1px solid $divider-2;
  padding: 28px 32px;
  border-radius: 6px;
  transition: background-color 0.5s, color 0.25s;
  background: $bg-soft;
}
</style>
