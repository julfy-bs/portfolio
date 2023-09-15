<template>
  <a
    :href="link"
    target="_blank"
    class="ui__link"
  >
    <element-svg
      file-name="link"
      class="social__icon cv cv--is-small"
    />
    <slot />
  </a>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue'
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue';

interface Props {
  link: string;
}
const props = defineProps<Props>()
const { link } = toRefs(props)
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.ui__link {
  width: 100%;
  text-align: center;
  background-color: $bg-mute;
  padding: 8px 18px;
  font-weight: 500;
  margin: 2px 0;
  border-radius: 8px;
  transition: background-color .5s, color .5s;
  font-size: 12px;
  display: flex;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: $gray-4;
    transition-duration: .2s;
  }

  .cv {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $text-2;
    transition: fill .25s ease, stroke .25s ease;
    align-self: center;

    &--is-small {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
