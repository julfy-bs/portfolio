<template>
  <div class="input__group">
    <label
      :for="name"
    >
      {{ capitalizeFirstLetter(name) }}
    </label>
    <textarea
      v-model="input"
      :name="name"
      :placeholder="placeholder"
      @keyup="updateStore(storeKey, input)"
    />
  </div>
</template>

<script setup lang='ts'>
import { ref, toRefs } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'
import { useUser } from '@/hooks/useUser'
import { UserKey } from '@/models/UserPayload'

interface Props {
  name: string;
  placeholder?: string;
  storeKey: UserKey;
}

const props = defineProps<Props>()
const { name, placeholder, storeKey } = toRefs(props)

const input = ref(placeholder?.value ? placeholder.value : '')

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

  textarea {
    border: 1px solid $divider-2;
    border-radius: 8px;
    padding: 6px 12px;
    transition: color 0.25s;
    height: floor(calc(250px / 1.1));
    resize: none;
    color: $text-1;
  }
}
</style>
