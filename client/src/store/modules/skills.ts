import Skill from '@/models/Skill'
import { ActionContext } from 'vuex'
import { RootState } from '@/store'

interface SkillOpened {
  skill: string
}

export interface SkillsState {
  skillsList: Array<Skill>
  isSkillOpened: boolean
  skillOpened: SkillOpened
}

// :SkillsState
const state = () => ({
  skillsList: [
    {
      id: 0,
      title: 'Layout',
      url: 'html',
      description: `It's hard to imagine frontend development without mentioning writing markup for the site. In modern realities, markup is still essential in the world of web development, which will definitely not change in the near future. A fairly obvious set of html coder HTML5, CSS3, BEM, which is used exclusively in every project. If we talk about convenience and saving time for working with layout - pug, CSS preprocessors (sass is my favorite), CSS frameworks.`,
      components: [
        { id: 0, title: 'pug', url: 'pug' },
        { id: 1, title: 'HTML5', url: 'html' },
        { id: 2, title: 'BEM', url: 'bem' },
        { id: 3, title: 'CSS3', url: 'css' },
        { id: 4, title: 'CSS preprocessors', url: 'css-preprocessors' },
        { id: 5, title: 'CSS frameworks', url: 'css-frameworks' }
      ]
    },
    {
      id: 1,
      title: 'Git',
      url: 'git',
      description: 'I understand the importance of the version control system well and moreover I regularly use it in my work and pet projects. I would also like to note the undeserved understatement of the value of Conventional Commits. Consistency always simplifies life in large projects.',
      components: [
        { id: 0, title: 'husky', url: 'husky' },
        { id: 1, title: 'lint staged', url: 'lint-staged' },
        { id: 2, title: 'Conventional Commits', url: 'conventional-commits' }
      ]
    },
    {
      id: 2,
      title: 'Workflow',
      url: 'workflow',
      description: 'It is difficult to succeed in programming without using the console directly. And the skill of setting up the workflow incredibly greatly simplifies life at the same time speeds up the development process, and if we talk about linters, it also pleases the eye.',
      components: [
        { id: 0, title: 'Terminal', url: 'terminal' },
        { id: 1, title: 'Gulp', url: 'gulp' },
        { id: 2, title: 'Webpack', url: 'webpack' },
        { id: 3, title: 'npm', url: 'npm' },
        { id: 4, title: 'yarn', url: 'yarn' },
        { id: 3, title: 'ESLint', url: 'eslint' },
        { id: 3, title: 'Prettier', url: 'prettier' },
      ]
    },
    {
      id: 3,
      title: 'JavaScript',
      url: 'javascript',
      description: 'the main character and the basis of modern frontend development as well as my "native" programming language. I have been working on javascript regularly for two years now. During this short period of time, I managed to examine many of its facets. With my deepening into the world of javascript came the understanding that a typescript is an essential part of it.',
      components: [
        { id: 0, title: 'ES6+', url: 'es' },
        { id: 1, title: 'Ajax', url: 'ajax' },
        { id: 2, title: 'TypeScript', url: 'typescript' }
      ]
    },
    {
      id: 4,
      title: 'Vue',
      url: 'vue',
      description: 'Vue.js became the first javascript framework for me. Let\'s say when I first met him, he seemed superfluous to me, but now I know exactly why he is so popular. With the advent of the Composition API, Vue components have become incredibly concise.',
      components: [
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
      id: 5,
      title: 'React',
      url: 'react',
      description: 'If speaking of Vue, I can call myself an experienced user, then speaking of React, it is worth noting that my journey began not so long ago.',
      components: [
        { id: 0, title: 'Redux', url: 'redux' }
      ]
    },
    {
      id: 6,
      title: 'Testing tools',
      url: 'testing',
      description: 'So far, I have not had to write tests in commercial projects, but even exclusively in pet projects, I was able to understand their great importance for simplifying development.',
      components: [
        { id: 0, title: 'Jest', url: 'jest' },
        { id: 1, title: 'Storybook', url: 'storybook' }
      ]
    },
    {
      id: 7,
      title: 'Node.js',
      url: 'node',
      description: `It would seem why split the node.js and javascript, after all, are the same language, but still they affect diametrically opposite aspects of the workflow. As for node.js - it is impossible to build a good application without a server. There's a node here.js helps us out.`,
      components: [
        { id: 0, title: 'Express', url: 'express' },
        { id: 1, title: 'NestJS', url: 'nest' }
      ]
    }
  ],
  isSkillOpened: false,
  skillOpened: {}
})

const mutations = {
  CHANGE_SKILL_DISPLAY_CONDITION(state: SkillsState, value?: boolean) {
    state.isSkillOpened = value || !state.isSkillOpened
  },
  CHANGE_OPENED_SKILL(state: SkillsState, value: SkillOpened) {
    state.skillOpened = value
  }
}

const actions = {
  async switchSkillDisplayCondition({ commit }: ActionContext<SkillsState, RootState>, value?: boolean) {
    try {
      await commit('CHANGE_SKILL_DISPLAY_CONDITION', value)
    } catch (e) {
      throw new Error(e)
    }
  },
  async switchOpenedSkill({ commit }: ActionContext<SkillsState, RootState>, value: SkillOpened) {
    try {
      await commit('CHANGE_OPENED_SKILL', value)
    } catch (e) {
      throw new Error(e)
    }
  }
}

const getters = {
  skillDetailed: (state: SkillsState) => state.skillsList.find(item => item.url === state.skillOpened.skill) || []
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
