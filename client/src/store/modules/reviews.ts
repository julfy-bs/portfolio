import { ActionContext } from 'vuex'
import { RootState } from '@/store'
import Review from '@/models/Review'

export interface ReviewsState {
  reviewsList: Array<Review>,
  reviewOpened: Review | {}
}

const state = (): ReviewsState => ({
  reviewsList: [
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
  ],
  reviewOpened: {}
})

const mutations = {
  SET_OPENED_REVIEW(state: ReviewsState, value: Review) {
    state.reviewOpened = value
  }
}

const actions = {
  async switchOpenedReview({ commit }: ActionContext<ReviewsState, RootState>, value: Review) {
    try {
      return await commit('SET_OPENED_REVIEW', value)
    } catch (e) {
      throw new Error(e)
    }
  }
}

const getters = {
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
