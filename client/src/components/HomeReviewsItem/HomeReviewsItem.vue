<template>
  <div
    class="reviews__item"
  >
    <div class="review__header">
      <div class="review__container">
        <div class="review__photo">
          <img
            src="@/static/images/user.jpg"
            alt="user"
          >
        </div>
        <h3 class="review__author">
          {{ props.review.author.name }}
        </h3>
        <a
          class="review__link"
          target="_blank"
          :href="props.review.author.company.link"
        >
          <span
            class="review__company"
            @click.stop
          >
            {{ props.review.author.company.name }}
          </span>
        </a>
      </div>
      <button
        class="button"
      >
        <span class="button__container">
          <span class="button__top" />
          <span class="button__middle" />
          <span class="button__bottom" />
        </span>
      </button>
    </div>
    <transition name="ease-out">
      <div
        v-if="detailedReviewOpened === props.review"
        class="review__body"
      >
        {{ props.review.description }}
      </div>
    </transition>
  </div>
</template>

<script setup lang='ts'>
import { useReviews } from '@/hooks/useReviews'
import Review from '@/models/Review'
const { detailedReviewOpened } = useReviews()

interface Props {
  review: Review
}

const props = defineProps<Props>()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.reviews__item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-between;
  background-color: $bg-mute;
  padding: 8px 18px;
  border-radius: 4px;
  margin: 2px 2px;
  transition: background-color 0.5s, color 0.25s;

  @media (min-width: $phones) {
    padding: 8px 18px;
  }

  &:hover  {
    cursor: auto;
    .button {
      color: $text-1;
    }
  }
}

.review__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;

  @media (min-width: $phones) {
    padding: 8px 18px;
  }
}

.review__body {
  padding: 8px;
  font-size: 12px;


  @media (min-width: $phones) {
    padding: 8px 18px 8px 82px;
    font-size: 14px;
  }

  @media (min-width: $tablets) {
    padding: 8px 18px 8px 82px;
    font-size: 14px;
  }
}

.review__container {
  display: flex;
  align-items: center;
}

.review__photo {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;

  @media (min-width: $phones) {
    width: 50px;
    height: 50px;
  }
}

.review__author {
  font-size: 16px;
  font-weight: 500;
  padding: 0 8px 0 16px;

  @media (min-width: $phones) {
    font-size: 17px;
    padding: 0 16px;
  }
}

.review__link {
  &:hover {
    .review__company {
      color: $hover-link-color;
    }
  }
}

.review__company {
  font-size: 10px;
  font-weight: 400;
  color: $text-2;

  @media (min-width: $phones) {
    font-size: 12px;
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  color: $text-2;

  &:hover {
    color: $text-1;
  }
}

.button__container {
  position: relative;
  width: 16px;
  height: 18px;
  overflow: hidden;
}

.button__top, .button__bottom {
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: currentColor;
  transition: top .25s, background-color .5s, transform .25s;
}

.button__top {
  left: 0;
  top: 6px;
  transform: translate(0) rotate(90deg);
}

.button__bottom {
  left: 0;
  top: 6px;
  transform: translate(0) rotate(180deg);
}

.reviews__item.review--is-opened .button__top {
  width: 16px;
  top: 6px;
  transform: translate(0) rotate(135deg);
}

.reviews__item.review--is-opened .button__bottom {
  width: 16px;
  top: 6px;
  transform: translate(0) rotate(225deg);
}

.ease-out-enter-active {
  transition: all 0.3s ease-out;
}

.ease-out-leave-active {
  transition: all 0.3s ease-out;
}

.ease-out-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.ease-out-enter-from {
  opacity: .3;
  transform: translateY(-20px);
}

.ease-out-enter {
  opacity: 1;
  transform: translateY(0px);
}

.ease-out-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
