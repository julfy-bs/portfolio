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
      description: 'Приложение для ведения домашней бухгалтерии с авторизацией, личным кабинетом, таблицами и графиками Chart.js, пагинацией, настроенной системой оповещений.',
      skills: [
        { id: 0, title: 'HTML5', url: 'https://html5.org/' },
        { id: 1, title: 'Materialize css', url: 'https://materializecss.com/' },
        { id: 2, title: 'Git', url: 'https://git-scm.com/' },
        { id: 3, title: 'JavaScript', url: 'https://www.javascript.com/' },
        { id: 4, title: 'Vue', url: 'https://ru.vuejs.org/' },
        { id: 5, title: 'ESLint', url: 'https://eslint.org/' },
        { id: 6, title: 'Chart.js', url: 'https://www.chartjs.org/' },
        { id: 7, title: 'vuelidate', url: 'https://vuelidate-next.netlify.app/' },
        { id: 8, title: 'Firebase', url: 'https://firebase.google.com/' }
      ]
    },
    {
      id: 1,
      title: 'Место Россия',
      url: 'https://julfy-bs.github.io/mesto-project/',
      description: 'Приложение для обмена фотографиями.',
      skills: [
        { id: 0, title: 'HTML5', url: 'https://html5.org/' },
        { id: 1, title: 'CSS3', url: 'https://www.w3.org/Style/CSS/Overview.en.html' },
        { id: 2, title: 'Git', url: 'https://git-scm.com/' },
        { id: 3, title: 'JavaScript', url: 'https://www.javascript.com/' },
        { id: 4, title: 'BEM', url: 'https://bem.info/methodology/' }
      ]
    },
    {
      id: 2,
      title: 'Крипто-конвертер валют',
      url: 'https://julfy-bs.github.io/mesto-project/',
      description: 'Приложение для конвертации валют и ведения портфеля валют с таблицами Chart.js и автоматическим подсчетом общей стоимости кошелька.',
      skills: [
        { id: 0, title: 'HTML5', url: 'https://html5.org/' },
        { id: 1, title: 'CSS3', url: 'https://www.w3.org/Style/CSS/Overview.en.html' },
        { id: 2, title: 'SCSS', url: 'https://sass-lang.com/' },
        { id: 3, title: 'Git', url: 'https://git-scm.com/' },
        { id: 4, title: 'JavaScript', url: 'https://www.javascript.com/' },
        { id: 5, title: 'TypeScript', url: 'https://www.typescriptlang.org/' },
        { id: 6, title: 'Vue', url: 'https://ru.vuejs.org/' },
        { id: 7, title: 'BEM', url: 'https://bem.info/methodology/' }
      ]
    },
    {
      id: 3,
      title: 'Друзья',
      url: 'https://julfy-bs.github.io/friends/',
      description: 'Коммандный проект на курсе Яндекс Практикума для агрегатора благотворительных фондов. Написание слайдеров, сложных адаптивных форм, подключение плагинов. На проекте выступал в роли TeamLead\'а. ',
      skills: [
        { id: 0, title: 'HTML5', url: 'https://html5.org/' },
        { id: 1, title: 'CSS3', url: 'https://www.w3.org/Style/CSS/Overview.en.html' },
        { id: 2, title: 'Git', url: 'https://git-scm.com/' },
        { id: 3, title: 'JavaScript', url: 'https://www.javascript.com/' },
        { id: 4, title: 'ESLint', url: 'https://eslint.org/' },
        { id: 5, title: 'Prettier', url: 'https://prettier.io/' },
        { id: 6, title: 'BEM', url: 'https://bem.info/methodology/' }
      ]
    },
    {
      id: 3,
      title: 'Шахматы',
      url: 'https://julfy-bs.github.io/chess-app/',
      description: 'MVP приложение для игры вдохновленное приложением chess.com.',
      skills: [
        { id: 0, title: 'HTML5', url: 'https://html5.org/' },
        { id: 1, title: 'SCSS', url: 'https://sass-lang.com/' },
        { id: 2, title: 'Git', url: 'https://git-scm.com/' },
        { id: 3, title: 'JavaScript', url: 'https://www.javascript.com/' },
        { id: 4, title: 'TypeScript', url: 'https://www.typescriptlang.org/' },
        { id: 5, title: 'Vue', url: 'https://ru.vuejs.org/' },
        { id: 6, title: 'ESLint', url: 'https://eslint.org/' },
        { id: 7, title: 'Prettier', url: 'https://prettier.io/' },
        { id: 8, title: 'BEM', url: 'https://bem.info/methodology/' }
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
