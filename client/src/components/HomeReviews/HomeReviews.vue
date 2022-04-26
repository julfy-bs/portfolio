<template>
  <section
    id="reviews"
    class="reviews"
  >
    <h2 class="reviews__heading">
      My Reviews
    </h2>
    <div class="reviews__list">
      <div
        v-for="review in reviewsList"
        :key="review.id"
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
              {{ review.author.name }}
            </h3>
            <a
              class="review__link"
              :href="review.author.company.link"
            >
              <span class="review__company">
                {{ review.author.company.name }}
              </span>
            </a>
          </div>
          <button
            class="button"
            @click="toggleButton($event, review)"
          >
            <span class="button__container">
              <span class="button__top" />
              <span class="button__middle" />
              <span class="button__bottom" />
            </span>
          </button>
        </div>
        <div class="review__body">
          {{ review.description }}
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'

const reviewsList = ref([
  {
    id: 0,
    title: 'Отзыв 1',
    author: {
      name: 'Alex',
      company: {
        name: 'Yandex',
        link: '#'
      }
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid, architecto asperiores, cupiditate distinctio dolor dolorem, dolores fugiat illo iste iure molestiae mollitia necessitatibus nulla numquam quaerat rerum tempore voluptatem.'
  },
  {
    id: 1,
    title: 'Отзыв 2',
    author: {
      name: 'Victor',
      company: {
        name: 'Google',
        link: '#'
      }
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid, architecto asperiores, cupiditate distinctio dolor dolorem, dolores fugiat illo iste iure molestiae mollitia necessitatibus nulla numquam quaerat rerum tempore voluptatem.'
  },
  {
    id: 2,
    title: 'Отзыв 3',
    author: {
      name: 'Vladilen',
      company: {
        name: 'Epam',
        link: '#'
      }
    },
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus aliquid, architecto asperiores, cupiditate distinctio dolor dolorem, dolores fugiat illo iste iure molestiae mollitia necessitatibus nulla numquam quaerat rerum tempore voluptatem.'
  }
])
let detailedReviewOpened: object = computed(() => Object({}))

const toggleButton = (event: Event, review: any) => {
  const target = event.currentTarget as HTMLSpanElement
  console.log(target.classList.contains('button--is-active'), target)
  if (target.classList.contains('button--is-active')) {
    console.log('removing')
    detailedReviewOpened = {}
    target.classList.remove('button--is-active')
  } else {
    console.log('adding')
    console.log(review)
    detailedReviewOpened = review
    target.classList.add('button--is-active')
  }
}
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.reviews {

}

.reviews__list {
  display: flex;
  flex-flow: column nowrap;
}

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
}

.review__header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 18px;
}

.review__container {
  display: flex;
  align-items: center;
}

.review__photo {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}

.review__author {
  font-size: 17px;
  font-weight: 500;
  padding: 0 16px;
}

.review__link {
  &:hover {
    .review__company {
      color: $hover-link-color;
    }
  }
}

.review__company {
  font-size: 12px;
  font-weight: 300;
  color: $text-2;
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

.button__container {
  position: relative;
  width: 16px;
  height: 18px;
  overflow: hidden;
}

.button__top, .button__middle, .button__bottom {
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: $text-1;
  transition: top .25s, background-color .5s, transform .25s;
}

.button__top {
  left: 0;
  top: 6px;
  transform: translate(0) rotate(180deg);
}

.button__middle {
  left: 0;
  top: 6px;
  transform: translate(0) rotate(180deg);
}

.button__bottom {
  left: 0;
  top: 6px;
  transform: translate(0) rotate(90deg);
}

.button:hover .button__top {
  width: 10px;
  left: 0;
  bottom: 0;
  transform: translate(-1px, 3px) rotate(45deg);
}

.button:hover .button__middle {
  display: block;
  transform: translate(0) rotate(90deg);
}

.button:hover .button__bottom {
  width: 10px;
  right: 0;
  bottom: 0;
  transform: translate(7px, 3px) rotate(135deg);
}

.button.button--is-active .button__top {
  width: 16px;
  top: 6px;
  transform: translate(0) rotate(135deg);
}

.button.button--is-active .button__middle {
  top: 6px;
  transform: translate(0, -16px);
}

.button.button--is-active .button__bottom {
  width: 16px;
  top: 6px;
  transform: translate(0) rotate(225deg);
}

.review__body {
  height: 0;
  padding: 8px 18px;
}
</style>
