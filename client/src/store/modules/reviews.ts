import { ActionContext } from 'vuex'
import { RootState } from '@/store'
import Review from '@/models/Review'

export interface ReviewsState {
  reviewsList: Array<Review>,
  reviewOpened: Review | {}
}

const state = (): ReviewsState => ({
  reviewsList: [
    // {
    //   id: 0,
    //   author: {
    //     name: 'Dmitry Kovalchuk',
    //     position: 'Loftschool Founder',
    //     photo: 'https://sun9-66.userapi.com/s/v1/if2/KcR08a9os9wBpfDcW8NiQQv7tNCnpyUsX4Ho-CVpXXa3MpSzoWmKSIJp5oiMGhRXL38hJl47aIBRED89GArZaTyt.jpg?size=1333x2000&quality=95&type=album',
    //     company: {
    //       name: 'Loftschool',
    //       link: 'https://loftschool.com/'
    //     }
    //   },
    //   description: 'This guy was trained in web development not somewhere, but at LoftSchool! 4.5 months of only the most difficult trials and sleepless nights!'
    // },
    // {
    //   id: 1,
    //   author: {
    //     name: 'Vladimir Sabantsev',
    //     position: 'Loftschool Coach',
    //     photo: 'https://ashvalev78.github.io/portfolio/build/assets/images/im/Vladimir.jpg',
    //     company: {
    //       name: 'Loftschool',
    //       link: 'https://loftschool.com/'
    //     }
    //   },
    //   description: 'This code will withstand any tests. Just please don\'t load the site on too old browsers.'
    // }
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
