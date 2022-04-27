import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import Review from '@/models/Review'

export const useReviews = () => {
  const store = useStore()

  const reviewsList = computed((): Review[] => store.state.reviews.reviewsList)
  const detailedReviewOpened = computed((): Review => store.state.reviews.reviewOpened)
  const switchOpenedReview = async (value: Review | object): Promise<void> => {
    await store.dispatch('reviews/switchOpenedReview', value)
  }

  const reviews = ref<HTMLDivElement | null>(null)

  const removeActiveClass = () => {
    const array = Array.from((<Element> reviews.value).children)
    array.forEach(item => item.classList.remove('review--is-opened'))
  }

  const toggleButton = (event: Event, review: Review) => {
    const target = event.currentTarget as HTMLSpanElement
    const classCheck: boolean = target.classList.contains('review--is-opened')
    if (classCheck) {
      void switchOpenedReview({})
      removeActiveClass()
    } else {
      void switchOpenedReview(review)
      removeActiveClass()
      target.classList.add('review--is-opened')
    }
  }

  return {
    toggleButton,
    reviewsList,
    detailedReviewOpened,
    reviews
  }
}
