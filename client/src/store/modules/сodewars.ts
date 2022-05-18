import { ActionContext } from 'vuex'
import { RootState } from '@/store'
import Codewars from '@/models/Codewars'
import axios from 'axios'

const codewarsApi = 'https://www.codewars.com/api/v1/users/julfy-bs'

export interface CodewarsState {
  codewars: Codewars
}

// :CodewarsState
const state = () => ({
  codewars: {}
})

const mutations = {
  GET_CODEWARS_DATA(state: CodewarsState, value: Codewars) {
    state.codewars = value
  }
}

const actions = {
  async getCodewarsData({ commit }: ActionContext<CodewarsState, RootState>) {
    try {
      const {data} = await axios.get(codewarsApi)
      // console.log(data)
      commit('GET_CODEWARS_DATA', data)
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
