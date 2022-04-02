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
          <home-navigation :close-burger="closeMenu" />
          <main-socials />
          <main-burger
            :is-active="isBurgerActive"
            :toggle-burger="toggleBurger"
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
          :close-burger="closeMenu"
          :is-burger-active="isBurgerActive"
        />
        <main-socials :is-burger-active="isBurgerActive" />
      </div>
    </div>
  </header>
</template>

<script>
import MainLogo from '@/components/MainLogo/MainLogo.vue'
import HomeNavigation from '@/components/HomeNavigation/HomeNavigation.vue'
import MainSocials from '@/components/MainSocials/MainSocials.vue'
import MainBurger from '@/components/MainBurger/MainBurger'
import { ref } from 'vue'

export default {
  name: 'HomeHeader',
  components: {
    MainLogo,
    HomeNavigation,
    MainSocials,
    MainBurger
  },
  setup() {
    const isBurgerActive = ref(false)
    const toggleBurger = () => {
      isBurgerActive.value = !isBurgerActive.value
    }
    const closeMenu = () => {
      isBurgerActive.value = false
    }
    return {
      isBurgerActive,
      toggleBurger,
      closeMenu
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.header {
  position: relative;
  top: 0;
  left: 0;
  z-index: $z-index-nav;


  @media (min-width: 960px) {
    position: fixed;
    top: $banner-height;
    width: 100%;
  }
}

.navbar {
  position: relative;
  border-bottom: $header-border;
  padding: 0 12px 0 24px;
  height: $header-height;
  background-color: $header-background-color;
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
  top: nav-screen-top();
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
</style>
