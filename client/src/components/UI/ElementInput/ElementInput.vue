<template>
  <div class="input__group">
    <label
      :for="name"
    >
      {{ capitalizeFirstLetter(name) }}
    </label>
    <input
      v-model="input"
      :type="type"
      :name="name"
      :placeholder="placeholder ? placeholder : `Enter ${name}`"
      @keyup="updateStore(storeKey, input)"
    >
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRefs } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'
import { useUser } from '@/hooks/useUser'
import { UserKey } from '@/models/UserPayload'

type inputType = 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'color' | 'date' | 'file'

interface Props {
  type: inputType;
  name: string;
  placeholder?: string;
  storeKey?: UserKey;
}

const props = defineProps<Props>()
const { type = 'text', name, placeholder, storeKey } = toRefs(props)

const input = ref<string>('')

onMounted(() => {
  if (placeholder?.value) {
    input.value = placeholder.value
  }
})

const { updateStore } = useUser()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.input__group {
  display: flex;
  flex-flow: column nowrap;
  gap: .5rem;

  label {
    transition: color 0.25s;
    color: $text-1;
  }

  input {
    border: 1px solid $divider-2;
    border-radius: 8px;
    padding: 6px 12px;
    transition: color 0.25s;
    color: $text-1;
  }
}
</style>
