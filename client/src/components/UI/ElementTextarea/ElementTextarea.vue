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
    />
  </div>
</template>

<script setup lang='ts'>
import { onMounted, ref, toRefs } from 'vue'
import { capitalizeFirstLetter } from '@/helpers/capitalizeFirstLetter'

interface Props {
  name: string;
  placeholder?: string;
}

const props = defineProps<Props>()
const { name, placeholder } = toRefs(props)

const input = ref<string>('')

onMounted(() => {
  if (placeholder?.value) {
    input.value = placeholder.value
  }
})
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
