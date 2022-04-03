<template>
  <HomeHeader />
  <main id="main">
    <section id="hero">
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
    <canvas id="canvas" />
  </main>
</template>
<script>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'

export default {
  name: 'HomePage',
  components: {
    HomeHeader
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

#canvas {
  display: block;
  width: 100vw;
  height: 62px;
  background: $bg;
  border-top: 1px solid $divider-light-2;
  border-bottom: 1px solid $divider-light-2;
}

#main {
  @media (min-width: 960px) {
    padding-top: main-padding-top();
  }
}

#hero {
  padding: 96px 32px;
  text-align: center;
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

.gradient {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
