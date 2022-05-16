import { MutationTree } from 'vuex'
import User from '@/models/User'
import UserPayload, { UserKey, UserValue } from '@/models/UserPayload'

export interface UserState {
  user: User
}

enum MutationTypes {
  CHANGE_USER_FIELD = 'CHANGE_USER_FIELD',
}

const state = (): UserState => ({
  user: {
    city: 'Moscow',
    dateOfBirth: '1996-12-13',
    description: 'I am a front-end developer based in Moscow. My focus area for the past few years has been front-end development with Vue. \nMy passion is developing modern websites and applications. I get pleasure when I create interesting and modern applications. I am currently looking for a job as a Junior Frontend developer. \nI haven\'t had to work as a Frontend developer yet, but at the moment I have all the necessary knowledge and skills to work effectively as a Junior Frontend developer.',
    email: 'julfy.web@gmail.com',
    name: 'Bogdan',
    photo: 'https://habrastorage.org/getpro/moikrug/uploads/user/100/039/198/2/avatar/0f3d15744a4a806a1df1063debbee4c6.jpg',
    resume: 'https://julfy.notion.site/Resume-565f39bdd17d404e9f1394f48fb01f66',
    surname: 'Sutuzhko',
    telegram: 'https://t.me/julfy_bs',
    github: 'https://github.com/julfy-bs',
    codewars: 'https://www.codewars.com/users/julfy-bs',
    discord: 'https://discordapp.com/users/236551328313114635/'
  }
})

type Mutations<S = UserState> = {
  [MutationTypes.CHANGE_USER_FIELD](state: S, payload: UserPayload<UserKey, UserValue>): void
}

const mutations: MutationTree<UserState> & Mutations = {
  [MutationTypes.CHANGE_USER_FIELD](state, payload) {
    state.user[payload.key] = payload.value
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
