<template>
  <div class="input__group">
    <label
      :for="name"
    >
      {{ capitalizeFirstLetter(name) }}
    </label>
    <input
      :type="type"
      :name="name"
      :placeholder="`Enter ${name}`"
    >
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'

type inputType = 'text' | 'password' | 'email' | 'number' | 'checkbox' | 'color' | 'date' | 'file'

interface Props {
  type: inputType;
  name: string;
}

const props = defineProps<Props>()
const { type = 'text', name } = toRefs(props)
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
  }
}
</style>
