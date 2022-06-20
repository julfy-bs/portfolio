<template>
  <section
    id="hero"
    class="hero"
  >
    <element-background />
    <h1 class="hero-title gradient">
      Frontend Developer's
    </h1>
    <h1 class="hero-title gradient">
      Portfolio
    </h1>
  </section>
</template>

<script setup lang='ts'>
import ElementBackground from '@/components/UI/ElementBackground/ElementBackground.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.hero {
  height: calc(100vh - #{$header-height} - #{$banner-height});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  position: relative;

  @media (max-width: $tablets-big) {
    padding-top: 229px;
    padding-bottom: 229px;
  }
}

.hero-title {
  z-index: $z-index-hero-content;
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
    font-size: 40px;
  }

  @media (max-width: $phones) {
    font-size: 36px;
  }
}

.gradient {
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  letter-spacing: .4px;
  background-color: $brand-vue;
  background-image: $vue-gradient;
  animation: animation_btn_idle 15s ease-in-out infinite;
}

@keyframes animation_btn_idle {
  0% {
    background-position: 0 0
  }
  50% {
    background-position: 100% center;
  }
  100% {
    background-position: 0 0
  }
}
</style>
