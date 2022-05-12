<template>
  <div class="wrapper">
    <admin-login />
  </div>
</template>

<script setup lang='ts'>
import AdminLogin from '@/components/AdminLogin/AdminLogin.vue'

</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.login {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 410px;

  &__title {
    font-size: 36px;
    font-weight: 500;
    color: $text-2;
    margin-bottom: 34px;
  }
}
</style>
