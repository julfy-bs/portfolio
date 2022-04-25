<template>
  <HomeHeader />
  <main
    class="main"
  >
    <home-hero />
    <home-about />
    <home-skills />
    <home-works />
  </main>
</template>

<script setup lang='ts'>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'
import HomeSkills from '@/components/HomeSkills/HomeSkills.vue'
import HomeWorks from '@/components/HomeWorks/HomeWorks.vue'
// todo: настроить присвоение hash при прокрутке страницы. Баг: сбивается hash
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.ts'
useIntersectionObserver('section')
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.main {
  position: relative;
}

</style>
