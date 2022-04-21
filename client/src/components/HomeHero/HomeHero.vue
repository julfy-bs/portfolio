<template>
  <section
    id="hero"
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
</template>

<script>
export default {
  name: 'HomeHero'
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  text-align: center;

  @media (max-width: $tablets-big) {
    padding-top: 229px;
    padding-bottom: 229px;
    min-height: 90vh;
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
.gradient {
  background: -webkit-linear-gradient(315deg, #42d392 25%, #647eff);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
