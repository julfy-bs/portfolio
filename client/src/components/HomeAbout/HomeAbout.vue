<template>
  <section
    id="about"
    class="about"
  >
    <home-about-info />
    <home-about-description />
  </section>
</template>

<script>
import HomeAboutInfo from '@/components/HomeAboutInfo/HomeAboutInfo'
import HomeAboutDescription from '@/components/HomeAboutDescription/HomeAboutDescription'

export default {
  name: 'HomeAbout',
  components: {
    HomeAboutInfo,
    HomeAboutDescription
  }

}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.about {
  color: $text-2;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: $bg;
  transition: color .5s, background-color .5s;

  @media (min-width: $tablets) {
    flex-direction: row;
    flex-wrap: nowrap;
  }
}

.info, .description {
  display: flex;
  flex-direction: column;
}

.info + .description {
  margin-bottom: 48px;

  @media (min-width: $tablets) {
    margin-left: 48px;
  }
}
</style>
