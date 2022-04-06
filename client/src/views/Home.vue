<template>
  <HomeHeader />
  <main
    id="hero"
    class="main"
  >
    <section
      class="hero"
    >
      <h1 class="hero-title">
        Личный сайт
        <br>
        <span class="gradient">
          Frontend
        </span>
        <br>
        разработчика
      </h1>
    </section>
    <div class="divider" />
    <home-about />
  </main>
</template>
<script>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'

export default {
  name: 'HomePage',
  components: {
    HomeHeader,
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

.hero {
  padding: 209px 32px;
  text-align: center;

  @media (max-width: $tablets-big) {
    padding-top: 229px;
    padding-bottom: 229px;
  }

  @media (max-width: $tablets) {
    padding-top: 262px;
    padding-bottom: 262px;
  }

  @media (max-width: $phones) {
    padding-top: 275px;
    padding-bottom: 275px;
  }
}

.hero-title {
  font-size: 76px;
  line-height: 1.1;
  font-weight: 900;
  letter-spacing: -1px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: $tablets-big) {
    font-size: 64px;
    letter-spacing: -.5px;
  }

  @media (max-width: $tablets) {
    font-size: 44px;
  }

  @media (max-width: $phones) {
    font-size: 36px;
  }
}

.divider {
  height: 65px;
  border-top: 1px solid $divider-1;
  border-bottom: 1px solid $divider-1;
  padding: 12px 24px;
  text-align: center;
}

.gradient {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
