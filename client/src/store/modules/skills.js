const state = () => ({
  skillsList: [
    {
      id: 0, title: 'Верстка', url: 'html', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, nesciunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, nesciunt? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fuga, nesciunt?', components: [
        { id: 0, title: 'pug', url: 'pug' },
        { id: 1, title: 'HTML5', url: 'html' },
        { id: 2, title: 'BEM', url: 'bem' },
        { id: 3, title: 'CSS', url: 'css' },
        { id: 4, title: 'CSS preprocessors', url: 'css-preprocessors' },
        { id: 5, title: 'CSS frameworks', url: 'css-frameworks' }
      ]
    },
    {
      id: 1, title: 'Git', url: 'git', components: [
        { id: 0, title: 'husky', url: 'husky' },
        { id: 1, title: 'lint staged', url: 'lint-staged' },
        { id: 2, title: 'Conventional Commits', url: 'conventional-commits' }
      ]
    },
    {
      id: 2, title: 'Workflow', url: 'workflow', components: [
        { id: 0, title: 'Terminal', url: 'terminal' },
        { id: 1, title: 'Gulp', url: 'gulp' },
        { id: 2, title: 'Webpack', url: 'webpack' },
        { id: 3, title: 'npm', url: 'npm' },
        { id: 4, title: 'yarn', url: 'yarn' }
      ]
    },
    {
      id: 3, title: 'JavaScript', url: 'javascript', components: [
        { id: 0, title: 'ES6+', url: 'es' },
        { id: 1, title: 'Ajax', url: 'ajax' },
        { id: 2, title: 'TypeScript', url: 'typescript' }
      ]
    },
    {
      id: 4, title: 'Vue', url: 'vue', components: [
        { id: 0, title: 'Vue 2', url: 'vue-2' },
        { id: 1, title: 'Vue 3', url: 'vue-3' },
        { id: 2, title: 'Vuex', url: 'vuex' },
        { id: 2, title: 'Vue router', url: 'vue router' },
        { id: 3, title: 'Option API', url: 'option-api' },
        { id: 4, title: 'Composition API', url: 'composition-api' },
        { id: 5, title: 'Nuxt', url: 'nuxt' }
      ]
    },
    {
      id: 5, title: 'React', url: 'react', components: [
        { id: 0, title: 'Redux', url: 'redux' }
      ]
    },
    {
      id: 6, title: 'Тестирование', url: 'testing', components: [
        { id: 0, title: 'Jest', url: 'jest' },
        { id: 1, title: 'Storybook', url: 'storybook' }
      ]
    },
    {
      id: 7, title: 'Node.js', url: 'node', components: [
        { id: 0, title: 'Express', url: 'express' },
        { id: 1, title: 'NestJS', url: 'nest' }
      ]
    }
  ],
  isSkillOpened: false,
  skillOpened: {}
})

const mutations = {
  CHANGE_SKILL_CONDITION(state, value) {
    state.isSkillOpened = value || !state.isSkillOpened
  },
  CHANGE_OPENED_SKILL(state, value) {
    state.skillOpened = value
  }
}

const actions = {
  async switchSkillCondition({ commit }, value) {
    try {
      await commit('CHANGE_SKILL_CONDITION', value)
    } catch (e) {
      throw new Error(e)
    }
  },
  async switchOpenedSkill({commit}, value) {
    try {
      await commit('CHANGE_OPENED_SKILL', value)
    } catch (e) {
      throw new Error(e)
    }
  }
}

const getters = {
  skillDetailed: (state) => state.skillsList.find(item => item.url === state.skillOpened.skill) || []
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
