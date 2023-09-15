import { MutationTree } from 'vuex'
import User from '@/models/User'
import UserPayload, { UserKey, UserValue } from '@/models/UserPayload'

export interface UserState {
  user: User
}

enum MutationTypes {
  CHANGE_USER_FIELD = 'CHANGE_USER_FIELD',
  UPDATE_USER = 'UPDATE_USER'
}

const state = (): UserState => ({
  user: {
    city: 'Москва',
    dateOfBirth: '1996-12-13',
    description: `Я Frontend разработчик, студент Яндекс Практикума и Азовского государственного педагогического университета по направлению Фундаментальная информатика и информационные технологии. 👨‍🎓 \n Ежедневно развиваюсь в разработке для того, чтобы приносить пользу команде и миру. 🌍`,
    //
    //  Стратегическое мышление, развитое за время профессиональных занятий шахматами, позволяет мне систематизировать и приоритизировать блоки работы, соблюдая при этом поставленные сроки.
    //  Лингвистическое образование дает мне понимание системности и логики языков, что сокращает сроки освоения материала.
    //  Самое важное для меня – внести вклад в достижение поставленной перед командой цели и получить бесценный опыт, который поможет стать профессионалом во frontend-разработке.
    email: 'sutuzhko.bogdan@ya.ru',
    name: 'Богдан',
    photo: 'https://avatars.githubusercontent.com/u/61148628?v=4',
    // resume: 'https://julfy.notion.site/Resume-565f39bdd17d404e9f1394f48fb01f66',
    resume: 'https://disk.yandex.ru/i/MZwPtgnPq6uqAQ',
    surname: 'Сутужко',
    telegram: 'https://t.me/julfy_bs',
    github: 'https://github.com/julfy-bs',
    codewars: 'https://www.codewars.com/users/julfy-bs',
    linkedIn: 'https://www.linkedin.com/in/sutuzhko-bogdan/',
    discord: 'https://discordapp.com/users/236551328313114635/'
  }
})

type Mutations<S = UserState> = {
  [MutationTypes.CHANGE_USER_FIELD](state: S, payload: UserPayload<UserKey, UserValue>): void
  // todo: нужна ли эта мутация?
  [MutationTypes.UPDATE_USER](state: S, payload: User): void
}

const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.CHANGE_USER_FIELD](state, payload) {
    state.user[payload.key] = payload.value
  },
  [MutationTypes.UPDATE_USER](state, payload) {
    state.user = payload
  }
}

const actions = {}

const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
