import SkillComponent from '@/models/SkillComponent.ts'


export default interface Skill {
  id: number;
  title: string;
  url?: string;
  description?: string;
  components?: Array<SkillComponent>
}
