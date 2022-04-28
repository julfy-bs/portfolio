<template>
  <h2 class="reviews__heading">
    My Reviews
  </h2>
  <div
    ref="reviews"
    class="reviews__list"
  >
    <home-reviews-item
      v-for="review in reviewsList"
      :key="review.id"
      :review="review"
      @click="toggleButton($event, review)"
    />
  </div>
</template>

<script setup lang='ts'>
import HomeReviewsItem from '@/components/HomeReviewsItem/HomeReviewsItem.vue'
import { useReviews } from '@/hooks/useReviews'
const { toggleButton, reviewsList, reviews } = useReviews()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";
.reviews__list {
  display: flex;
  flex-flow: column nowrap;
}
</style>
