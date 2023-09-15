<template>
  <element-navigation>
    <router-link
      to="/#skills"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Навыки
    </router-link>
    <router-link
      to="/#works"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Работы
    </router-link>
  </element-navigation>
</template>

<script setup lang='ts'>
import ElementNavigation from '@/components/UI/ElementNavigation/ElementNavigation.vue'
import { useBurger } from '@/hooks/useBurger'
const { closeBurger, isBurgerActive } = useBurger()
</script>

<style lang='scss'>
@import "src/assets/styles/_variables.scss";

</style>
