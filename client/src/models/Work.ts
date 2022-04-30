import Skill from '@/models/Skill'

export default interface Work {
  id: number
  title: string
  url: string
  description: string
  picture?: string
  skills: Array<Skill>
}
