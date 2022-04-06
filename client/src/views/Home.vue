<template>
  <HomeHeader />
  <main
    id="hero"
    class="main"
  >
    <home-hero />
    <div class="divider" />
    <home-about />
  </main>
</template>
<script>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'

export default {
  name: 'HomePage',
  components: {
    HomeHeader,
    HomeHero,
    HomeAbout
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.main {
  @media (min-width: 960px) {
    padding-top: $header-height;
  }
}

.divider {
  height: 65px;
  border-top: 1px solid $divider-1;
  border-bottom: 1px solid $divider-1;
  padding: 12px 24px;
  text-align: center;
}

</style>
