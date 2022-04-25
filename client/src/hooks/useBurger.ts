import { computed } from 'vue'
import { useStore } from 'vuex'

export const useBurger = () => {
  const store = useStore()
  // burger
  const isBurgerActive = computed(() => (store.state.header.isBurgerActive))
  const switchBurgerDisplayCondition = async (value: boolean): Promise<void> => await store.dispatch('header/switchBurgerDisplayCondition', value)
  //skill
  const isSkillOpened = computed(() => store.state.skills.isSkillOpened)
  const switchSkillDisplayCondition = async (value?: boolean) => await store.dispatch('skills/switchSkillDisplayCondition', value)


  const openBurger = () => {
    document.body.classList.add('modal-open')
    void switchBurgerDisplayCondition(true)
  }

  const closeBurger = () => {
    document.body.classList.remove('modal-open')
    void switchBurgerDisplayCondition(false)
    if (isSkillOpened.value) void switchSkillDisplayCondition(false)
  }

  return {
    openBurger,
    closeBurger,
    isBurgerActive
  }
}
