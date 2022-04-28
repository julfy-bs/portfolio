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
    const currentTarget = event.currentTarget as HTMLDivElement
    const target = event.target as HTMLSpanElement
    const classCheckLink: boolean = target.classList.contains('review__link')
    const classCheckWrapper: boolean = currentTarget.classList.contains('review--is-opened')

    if (classCheckLink) {
      return false
    } else if (classCheckWrapper) {
      void switchOpenedReview({})
      removeActiveClass()
    } else {
      void switchOpenedReview(review)
      removeActiveClass()
      currentTarget.classList.add('review--is-opened')
    }
  }

  return {
    toggleButton,
    reviewsList,
    detailedReviewOpened,
    reviews
  }
}
