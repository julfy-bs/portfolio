<template>
  <element-navigation>
    <router-link
      to="/#hero"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Home
    </router-link>
    <router-link
      to="/#about"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      About
    </router-link>
    <router-link
      to="/#skills"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Skills
    </router-link>
    <router-link
      to="/#works"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Works
    </router-link>
    <router-link
      to="/#reviews"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Reviews
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
