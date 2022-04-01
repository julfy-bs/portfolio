<template>
  <header
    id="header"
    class="header"
  >
    <div class="container">
      <div class="header__wrapper">
        <MainLogo />
        <HomeNavigation />
        <MainSocials />
      </div>
    </div>
  </header>
</template>

<script>
import MainLogo from '@/components/MainLogo/index.ts'
import HomeNavigation from '@/components/HomeNavigation/index.ts'
import MainSocials from '@/components/MainSocials/index.ts'

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
.header {
  //position: fixed;
  width: 100%;
  top: 0;
  background-color: transparent;
  height: $header-height;
}

.header__wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
