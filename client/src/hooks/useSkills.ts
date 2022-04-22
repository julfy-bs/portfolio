import Skill from '@/models/Skill'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

export const useSkills = () => {
  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  const skillsList = computed((): Array<Skill> => store.state.skills.skillsList)
  const isSkillOpened = computed((): boolean => store.state.skills.isSkillOpened)
  const switchSkillDisplayCondition = async (value?: boolean): Promise<void> => await store.dispatch('skills/switchSkillDisplayCondition', value)
  const switchOpenedSkill = async (value: object): Promise<void> => await store.dispatch('skills/switchOpenedSkill', value)

  onBeforeRouteUpdate(async (to, from) => {
    if (to.query !== from.query) {
      await switchOpenedSkill(to.query)
    }
  })

  if (route.query?.skill) {
    void switchSkillDisplayCondition()
    document.body.classList.add('modal-open')
    void switchOpenedSkill({ ...route.query })
  }

  const skillDetailOpen = (skill: Skill) => {
    void router.push({ query: { skill: skill.url }, hash: route.hash })
    console.log(route.hash)
    void switchSkillDisplayCondition()
    document.body.classList.add('modal-open')
  }

  const skillDetailClose = () => {
    void switchSkillDisplayCondition()
    void switchOpenedSkill({})
    document.body.classList.remove('modal-open')
    void router.push({ path: '/', hash: route.hash })
  }

  return {
    skillDetailOpen,
    skillDetailClose,
    skillsList,
    isSkillOpened
  }
}
