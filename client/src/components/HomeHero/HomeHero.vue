<template>
  <section
    id="hero"
    class="hero"
  >
    <element-background />
    <home-hero-title
      title="Frontend Developer's"
    />
    <home-hero-title title="Portfolio" />
  </section>
</template>

<script setup lang='ts'>
import ElementBackground from '@/components/UI/ElementBackground/ElementBackground.vue'
import HomeHeroTitle from '@/components/HomeHeroTitle/HomeHeroTitle.vue'
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
</style>
