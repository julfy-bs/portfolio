<template>
  <section
    id="about"
    class="about"
  >
    <div class="about__container">
      <home-about-info />
      <home-about-description />
    </div>
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
  transition: color .5s, background-color .5s;
}

.about__container {
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (min-width: $phones) {
    flex-direction: column;
    align-items: center;
    padding: 0 40px;
  }

  @media (min-width: $tablets) {
    flex-direction: column;
    align-items: center;
    padding: 0 150px;
  }

  @media (min-width: $tablets-big) {
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 0;
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
