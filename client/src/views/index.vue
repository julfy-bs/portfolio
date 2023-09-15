<template>
  <element-banner />
  <home-header />
  <main
    class="main"
  >
    <home-about />
    <div class="divider" />
    <home-skills />
    <home-works />
<!--    <home-reviews />-->
  </main>
</template>

<script setup lang='ts'>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'
import HomeSkills from '@/components/HomeSkills/HomeSkills.vue'
import HomeWorks from '@/components/HomeWorks/HomeWorks.vue'
import HomeReviews from '@/components/HomeReviews/HomeReviews.vue'
import ElementBanner from '@/components/UI/ElementBanner/ElementBanner.vue';
// todo: настроить присвоение hash при прокрутке страницы. Баг: сбивается hash
// import { useIntersectionObserver } from '@/hooks/useIntersectionObserver.ts'
//
// useIntersectionObserver('section')
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.main {
  position: relative;
}

.divider {
  width: 100%;
  border-bottom: 1px solid $divider-2;
}
</style>
