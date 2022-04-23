<template>
  <section
    id="about"
    class="about"
  >
    <home-about-info />
    <home-about-description />
  </section>
</template>

<script setup lang='ts'>
import HomeAboutInfo from '@/components/HomeAboutInfo/HomeAboutInfo.vue'
import HomeAboutDescription from '@/components/HomeAboutDescription/HomeAboutDescription.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.about {
  color: $text-2;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  transition: color .5s, background-color .5s;

  @media (min-width: $tablets) {
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: $tablets-big) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.info, .description {
  display: flex;
  flex-direction: column;
}

.info + .description {
  margin-bottom: 88px;

  @media (min-width: $tablets) {
    margin: 0;
  }

  @media (min-width: $tablets-big) {
    margin-left: 48px;
  }
}
</style>
