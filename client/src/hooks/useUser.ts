import { useStore } from 'vuex'
import { computed, ComputedRef } from 'vue'
import User from '@/models/User'
import UserPayload, { UserKey, UserValue } from '@/models/UserPayload'

interface useUser {
  user: ComputedRef<User>;
  updateStore: (key: UserKey, value: UserValue) => void;
  pushUser: (data: User) => void;
}

export const useUser = (): useUser=> {
  const store = useStore()
  const user = computed((): User => store.state.user.user)

  const changeUser = (payload: UserPayload<UserKey, UserValue>): void => store.commit('user/CHANGE_USER_FIELD', payload)
  const updateUser = (payload: User): void => store.commit('user/UPDATE_USER', payload)
  // todo: Кнопка save отправляет содержимое на backend

  const updateStore = (key: UserKey, value: UserValue): void => {
      changeUser({ key, value })
  }

  const pushUser = (data: User): void => {
    try {
      updateUser(data)
      console.log(data)
    } catch (e) {
      throw new Error(e)
    }
  }

  return {
    user,
    updateStore,
    pushUser
  }
}
