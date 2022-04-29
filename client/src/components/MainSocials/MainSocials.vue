<template>
  <div
    class="socials"
    :class="isBurgerActive ? 'socials--burger-is-active' : ''"
  >
    <!--    todo: разбить на компоненты, подключить массив-->
    <a
      href="https://t.me/julfy_bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="telegram"
        class="social__icon"
      />
    </a>
    <a
      href="https://github.com/julfy-bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="github"
        class="social__icon"
      />
    </a>
    <a
      href="https://www.codewars.com/users/julfy-bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="codewars"
        class="social__icon"
      />
    </a>
    <a
      href="https://discordapp.com/users/236551328313114635/"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="discord"
        class="social__icon"
      />
    </a>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue'
import { useBurger } from '@/hooks/useBurger'
const { isBurgerActive } = useBurger()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.socials {
  display: none;
  justify-content: center;
  margin-right: -10px;
  margin-left: 12px;

  @media (min-width: $desktop) {
    display: flex;
  }
}

.nav-screen .socials--burger-is-active {
  display: flex;
  margin: 12px 0 0;

  @media (min-width: $desktop) {
    display: none;
  }
}

.menu__group .socials {
  display: flex;
  margin: 0;
}

.appearance + .socials {
  margin-left: 12px;
}

.socials__link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-2;
  transition: fill .2s ease, stroke .2s ease;

  &--is-small {
    width: 36px;
    height: 36px;
  }

  &:hover {
    cursor: pointer;
    color: $hover-color
  }
}

.social__icon {
  width: 20px;
  height: 20px;
}
</style>
