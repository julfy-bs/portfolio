<template>
  <header
    id="top"
    class="header"
  >
    <div class="navbar">
      <div class="navbar__container">
        <main-logo />
        <div class="content">
          <!--todo: поиск-->
          <home-navigation :close-burger="closeBurger" />
          <change-appearance />
          <main-socials />
          <main-extra />
          <main-burger
            :is-active="isBurgerActive"
            :open-burger="openBurger"
            :close-burger="closeBurger"
          />
        </div>
      </div>
    </div>
    <div
      v-if="isBurgerActive"
      class="nav-screen"
    >
      <div class="nav-screen__container">
        <home-navigation
          :close-burger="closeBurger"
          :is-burger-active="isBurgerActive"
        />
        <div class="appearance--burger">
          <p class="appearance__text">
            Сменить тему
          </p>
          <change-appearance />
        </div>
        <main-socials :is-burger-active="isBurgerActive" />
      </div>
    </div>
  </header>
</template>

<script setup lang='ts'>
import MainLogo from '@/components/MainLogo/MainLogo.vue'
import HomeNavigation from '@/components/HomeNavigation/HomeNavigation.vue'
import MainSocials from '@/components/MainSocials/MainSocials.vue'
import MainBurger from '@/components/MainBurger/MainBurger.vue'
import ChangeAppearance from '@/components/MainAppearance/ChangeAppearance.vue'
import MainExtra from '@/components/MainExtra/MainExtra.vue'
import { ref } from 'vue'

const isBurgerActive = ref<boolean>(false)

const openBurger = (): void => {
  document.body.classList.add('modal-open')
  isBurgerActive.value = !isBurgerActive.value
}
const closeBurger = (): void => {
  document.body.classList.remove('modal-open')
  isBurgerActive.value = false
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.header {
  position: relative;
  top: 0;
  left: 0;
  z-index: $z-index-nav;


  @media (min-width: $tablets-big) {
    position: fixed;
    top: $banner-height;
    width: 100%;
  }
}

.navbar {
  position: relative;
  border-bottom: 1px solid $divider-2;
  padding: 0 12px 0 24px;
  height: $header-height;
  background-color: $bg;
  transition: border-color .5s, background-color .5s;

  @media (min-width: 768px) {
    padding: 0 12px 0 32px;
  }

  @media (min-width: 1280px) {
    padding: 0 32px;
  }
}

.navbar__container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: $screen-max-width;
  margin: 0 auto;
}

.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}

.nav-screen {
  position: fixed;
  top: $header-height;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 0 32px;
  width: 100%;
  background-color: $bg;
  transition: background-color .5s;
  overflow-y: auto;
}

.nav-screen__container {
  margin: 0 auto;
  padding: 24px 0 96px;
  max-width: 288px;
}

.navigation--burger-is-active + .appearance--burger {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 8px;
  padding: 12px 14px 12px 16px;
  background-color: $bg-soft;
  transition: background-color .5s;
}

.appearance__text {
  line-height: 24px;
  font-size: 12px;
  font-weight: 500;
  color: $text-2;
  transition: color .5s;
}
</style>
