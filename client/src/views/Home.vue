<template>
  <HomeHeader />
  <main
    id="hero"
    class="main"
  >
    <home-hero />
    <home-about />
    <!--    <section class="divider" />-->
    <home-skills />
  </main>
</template>

<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'
import HomeSkills from '@/components/HomeSkills/HomeSkills.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";
.main {
  position: relative;
}
.divider {
  border-top: 1px solid $divider-1;
  border-bottom: 1px solid $divider-1;
  padding: 12px 24px;
  text-align: center;
  min-height: 55px;
}
</style>
