<template>
  <span
    class="square"
    :class="square.color"
    data-role="square"
  />
</template>

<script setup lang='ts'>
import { ElementBackground as Square } from '@/models/ElementBackground'

interface Props {
  square: Square;
}

const props = defineProps<Props>()
</script>

<style lang='scss' scoped>
@import "@/assets/styles/_variables";

.square {
  display: block;
  width: 1rem;
  height: 1rem;
  margin: 5px;
  transition: 2s ease;
  background-color: transparent;
}

.square.green {
  background-color: $green;
}

.square.green-light {
  background-color: $green-light;
}

.square.green-lighter {
  background-color: $green-lighter;
}

.square.green-dark {
  background-color: $green-dark;
}

.square.green-darker {
  background-color: $green-darker;
}

.square.blue {
  background-color: $blue;
}

.square.blue-light {
  background-color: $blue-light;
}

.square.blue-lighter {
  background-color: $blue-lighter;
}

.square.blue-dark {
  background-color: $blue-dark;
}

.square.blue-darker {
  background-color: $blue-darker;
}

.square:hover {
  transition-duration: 0s;
}
</style>
