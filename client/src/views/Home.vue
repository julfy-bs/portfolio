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

<script setup lang="ts">
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'

</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

</style>
