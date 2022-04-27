import Work from '@/models/Work'
import { ActionContext } from 'vuex'
import { RootState } from '@/store'

interface WorkOpened {
  work: string
}

export interface WorksState {
  worksList: Array<Work>,
  isWorkOpened: boolean
  workOpened: WorkOpened
}

// :WorksState
const state = () => ({
  worksList: [
    { id: 0, title: 'pravfond 1', url: 'pravfond'},
    { id: 0, title: '2', url: '2' }
  ],
  isWorkOpened: false,
  workOpened: {}
})

const mutations = {
  CHANGE_WORK_DISPLAY_CONDITION(state: WorksState, value?: boolean) {
    state.isWorkOpened = value || !state.isWorkOpened
  },
  CHANGE_OPENED_WORK(state: WorksState, value: WorkOpened) {
    state.workOpened = value
  }
}

const actions = {
  async switchWorkDisplayCondition({ commit }: ActionContext<WorksState, RootState>, value?: boolean) {
    try {
      await commit('CHANGE_WORK_DISPLAY_CONDITION', value)
    } catch (e) {
      throw new Error(e)
    }
  },
  async switchOpenedWork({commit}: ActionContext<WorksState, RootState>, value: WorkOpened) {
    try {
      await commit('CHANGE_OPENED_WORK', value)
    } catch (e) {
      throw new Error(e)
    }
  }
}

const getters = {
  workDetailed: (state: WorksState) => state.worksList.find(item => item.url === state.workOpened.work) || []
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
