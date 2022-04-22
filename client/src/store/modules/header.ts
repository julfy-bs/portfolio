import { ActionContext } from 'vuex'
import { RootState } from '@/store'

export interface HeaderState {
  isBurgerActive: boolean
}

const state = (): HeaderState => ({
  isBurgerActive: false
})

const mutations = {
  CHANGE_BURGER_DISPLAY_CONDITION(state: HeaderState, value?: boolean) {
    state.isBurgerActive = value || !state.isBurgerActive
  },
}

const actions = {
  async switchBurgerDisplayCondition({ commit }: ActionContext<HeaderState, RootState>, value: boolean) {
    try {
      await commit('CHANGE_BURGER_DISPLAY_CONDITION', value)
    } catch (e) {
      throw new Error(e)
    }
  },
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
