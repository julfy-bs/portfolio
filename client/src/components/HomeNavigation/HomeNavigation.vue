<template>
  <nav
    class="navigation"
    :class="isBurgerActive ? 'navigation--burger-is-active' : ''"
  >
    <router-link
      to="#hero"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Главная
    </router-link>
    <router-link
      to="#about"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Обо мне
    </router-link>
    <router-link
      to="#skills"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Навыки
    </router-link>
    <router-link
      to="#works"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Работы
    </router-link>
    <router-link
      to="#reviews"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Отзывы
    </router-link>
  </nav>
</template>

<script>
// import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'HomeNavigation',
  props: {
    isBurgerActive: {
      type: Boolean,
      default: false
    },
    closeBurger: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.navigation {
  display: none;
  justify-content: center;

  @media (min-width: $tablets) {
    display: flex;
  }

  &--burger-is-active {
    display: flex;
    flex-flow: column nowrap;
  }
}

.navigation__link {
  display: block;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: $header-line-height;
  color: $text-1;
  transition: color .25s;

  &--burger-is-active {
    border-bottom: 1px solid $divider-2;
    padding: 12px 0 11px;
    line-height: 24px;
    font-size: 14px;
    transition: border-color .5s, color .25s;
  }

  &:hover {
    color: $hover-link-color;
  }
}
</style>
