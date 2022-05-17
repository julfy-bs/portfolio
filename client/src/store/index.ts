import { createStore } from 'vuex'
import skills, { SkillsState } from '@/store/modules/skills.ts'
import header, { HeaderState } from '@/store/modules/header.ts'
import works, { WorksState } from '@/store/modules/works.ts'
import codewars, { CodewarsState } from '@/store/modules/сodewars.ts'
import reviews, { ReviewsState } from '@/store/modules/reviews.ts'
import user, { UserState } from '@/store/modules/user.ts'


export interface RootState {
  skills: SkillsState,
  header: HeaderState,
  works: WorksState,
  codewars: CodewarsState,
  reviews: ReviewsState,
  user: UserState
}

export default createStore({
  modules: {
    skills,
    header,
    works,
    codewars,
    reviews,
    user
  }
})
