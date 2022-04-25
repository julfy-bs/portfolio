import { createStore } from 'vuex'
import skills, { SkillsState } from '@/store/modules/skills.ts'
import header, { HeaderState } from '@/store/modules/header.ts'
import works, { WorksState } from '@/store/modules/works.ts'

export interface RootState {
  skills: SkillsState,
  header: HeaderState,
  works: WorksState
}

export default createStore({
  modules: {
    skills,
    header,
    works
  }
})
