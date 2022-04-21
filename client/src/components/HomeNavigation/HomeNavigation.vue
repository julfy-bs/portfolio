<template>
  <nav
    class="navigation"
    :class="props.isBurgerActive ? 'navigation--burger-is-active' : ''"
  >
    <router-link
      to="#hero"
      class="navigation__link"
      :class="props.isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="clickLink"
    >
      Главная
    </router-link>
    <router-link
      to="#about"
      class="navigation__link"
      :class="props.isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="clickLink"
    >
      Обо мне
    </router-link>
    <router-link
      to="#skills"
      class="navigation__link"
      :class="props.isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="clickLink"
    >
      Навыки
    </router-link>
    <router-link
      to="#works"
      class="navigation__link"
      :class="props.isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="clickLink"
    >
      Работы
    </router-link>
    <router-link
      to="#reviews"
      class="navigation__link"
      :class="props.isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="clickLink"
    >
      Отзывы
    </router-link>
  </nav>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { useStore } from 'vuex'
interface Props {
  isBurgerActive: Boolean,
  closeBurger: Function
}
const props = defineProps<Props>()
const store = useStore()
const isSkillOpened = computed(() => store.state.skills.isSkillOpened)
const switchSkillCondition = async (value?: boolean) => await store.dispatch('skills/switchSkillCondition', value)
const clickLink = () => {
  if (!isSkillOpened.value) {
    props.closeBurger()
  } else {
    switchSkillCondition()
    props.closeBurger()
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
