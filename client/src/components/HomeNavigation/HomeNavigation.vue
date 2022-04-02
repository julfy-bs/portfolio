<template>
  <nav
    class="navigation"
    :class="isBurgerActive ? 'navigation--burger-is-active' : ''"
  >
    <a
      href="#top"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Главная
    </a>
    <a
      href="#about"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Обо мне
    </a>
    <a
      href="#skills"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Навыки
    </a>
    <a
      href="#works"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Работы
    </a>
    <a
      href="#reviews"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Отзывы
    </a>
  </nav>
</template>

<script>
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

  @media (min-width: $desktop) {
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
  color: $text-link-default-color;
  transition: color .25s;

  &--burger-is-active {
    border-bottom: 1px solid $divider-light-2;
    padding: 12px 0 11px;
    line-height: 24px;
    font-size: 14px;
    transition: border-color .5s, color .25s;
  }

  &:hover {
    color: $link-hover-color;
  }
}
</style>
