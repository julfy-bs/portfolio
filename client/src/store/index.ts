import { createStore } from 'vuex'
import skills, { SkillsState } from '@/store/modules/skills.ts'
import header, { HeaderState } from '@/store/modules/header.ts'

export interface RootState {
  skills: SkillsState,
  header: HeaderState
}

export default createStore({
  modules: {
    skills,
    header
  }
})
