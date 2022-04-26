import { createStore } from 'vuex'
import skills, { SkillsState } from '@/store/modules/skills.ts'
import header, { HeaderState } from '@/store/modules/header.ts'
import works, { WorksState } from '@/store/modules/works.ts'
import codewars, { CodewarsState } from '@/store/modules/сodewars'

export interface RootState {
  skills: SkillsState,
  header: HeaderState,
  works: WorksState,
  codewars: CodewarsState
}

export default createStore({
  modules: {
    skills,
    header,
    works,
    codewars
  }
})
