import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import User from '@/models/User'

export const useCodewars = () => {
  const store = useStore()
  const codewars = computed((): User => store.state.codewars.codewars)
  const getCodewarsData = async (): Promise<User> => await store.dispatch('codewars/getCodewarsData')

  onMounted(() => {
    void getCodewarsData()
  })

  return {
    codewars
  }
}
