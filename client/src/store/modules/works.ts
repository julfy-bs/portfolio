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
    {
      id: 0,
      title: 'Vue CRM Web App',
      url: 'https://vue-crm-qqq.web.app/',
      description: 'One of my first works written in Vue. The basis of the application is Firebase. The main interactions with the server are performed on the Firebase platform. The idea for the site is a personal account for home accounting. The API of the current exchange rate is connected for conversion into currency.',
      skills: [
        { id: 0, title: 'HTML5', url: 'html' },
        { id: 1, title: 'CSS frameworks', url: 'css-frameworks' },
        { id: 2, title: 'Git', url: 'git' },
        { id: 3, title: 'JavaScript', url: 'javascript' },
        { id: 4, title: 'Vue', url: 'vue' },
        { id: 5, title: 'Vuex', url: 'vuex' },
        { id: 6, title: 'Vue router', url: 'vue router' },
        { id: 7, title: 'Option API', url: 'option-api' }
      ]
    }
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
  async switchOpenedWork({ commit }: ActionContext<WorksState, RootState>, value: WorkOpened) {
    try {
      await commit('CHANGE_OPENED_WORK', value)
    } catch (e) {
      throw new Error(e)
    }
  }
}

const getters = {
  workDetailed: (state: WorksState) => state.worksList.find(item => item.title === state.workOpened.work) || []
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
