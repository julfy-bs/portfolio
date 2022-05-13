<template>
  <div
    class="button"
    :class="{
      'edit': role === 'edit',
      'delete': role === 'delete'
    }"
  >
    <button>
      <slot />
    </button>
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue'

type RoleType = 'edit' | 'save' | 'delete'

interface Props {
  role: RoleType;
}

const props = defineProps<Props>()

const { role = 'save' } = toRefs(props)
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.button {
  display: flex;
  align-items: flex-end;

  button {
    width: 100%;

    font-weight: 600;
    color: $bg;

    background-color: $brand-vue;
    border-radius: 6px;

    padding: 7px 24px;
    transition: background-color .5s, color .5s;

    &:hover {
      background-color: $brand-vue-dark;
    }
  }

  &.edit {
    button {
      background-color: $blue-light;

      &:hover {
        background-color: $blue-dark;
      }
    }
  }

  &.delete {
    button {
      background-color: $red-dark;

      &:hover {
        background-color: $red-darker;
      }
    }
  }
}
</style>
