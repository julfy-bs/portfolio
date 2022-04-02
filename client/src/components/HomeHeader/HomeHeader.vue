<template>
  <header
    id="header"
    class="header"
  >
    <div class="navbar">
      <div class="container">
        <main-logo />
        <div class="content">
          <!--todo: поиск-->
          <home-navigation />
          <main-socials />
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import MainLogo from '@/components/MainLogo/MainLogo.vue'
import HomeNavigation from '@/components/HomeNavigation/HomeNavigation.vue'
import MainSocials from '@/components/MainSocials/MainSocials.vue'

export default {
  name: 'HomeHeader',
  components: {
    MainLogo,
    HomeNavigation,
    MainSocials
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

.container {
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
</style>
