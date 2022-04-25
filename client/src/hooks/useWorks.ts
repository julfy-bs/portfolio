import { useStore } from 'vuex'
import { computed } from 'vue'
import Work from '@/models/Work'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'

export const useWorks = () => {
  const router = useRouter()
  const route = useRoute()
  const store = useStore()

  const worksList = computed(() => store.state.works.worksList)
  const isWorkOpened = computed(() => store.state.works.isWorkOpened)
  const switchOpenedWork = async (value: object): Promise<void> => await store.dispatch('works/switchOpenedWork', value)
  const switchWorkDisplayCondition = async (value?: boolean): Promise<void> => await store.dispatch('works/switchWorkDisplayCondition', value)

  onBeforeRouteUpdate(async (to, from) => {
    if (to.query !== from.query) {
      await switchOpenedWork(to.query)
    }
  })

  if (route.query?.work) {
    void switchWorkDisplayCondition()
    document.body.classList.add('modal-open')
    void switchOpenedWork({ ...route.query })
  }

  const workDetailOpen = (work: Work) => {
    void router.replace({ query: { work: work.url }, hash: route.hash })
    void switchWorkDisplayCondition(true)
    document.body.classList.add('modal-open')
  }

  const workDetailClose = () => {
    void switchWorkDisplayCondition(false)
    void switchOpenedWork({})
    document.body.classList.remove('modal-open')
    void router.replace({ path: '/', hash: route.hash })
  }

  return {
    workDetailOpen,
    workDetailClose,
    worksList,
    isWorkOpened
  }
}
