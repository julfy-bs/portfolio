<template>
  <div
    ref="backgroundBoard"
    class="squares-container"
  >
    <element-background-item
      v-for="square in squaresArray"
      :key="square.id"
      v-memo="[square.active, false]"
      :square="square"
      @mouseover="setColor(square)"
      @mouseleave="removeColor(square)"
    />
  </div>
</template>

<script setup lang='ts'>
import ElementBackgroundItem from '@/components/UI/ElementBackgroundItem/ElementBackgroundItem.vue'
import { useBackgroundAnimation } from '@/hooks/useBackgroundAnimation'
const { squaresArray, backgroundBoard, setColor, removeColor } = useBackgroundAnimation()
</script>

<style lang='scss' scoped>
@import "@/assets/styles/_variables";

.squares-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-height: calc(100vh - #{$header-height} - #{$banner-height});
  overflow: hidden;
  z-index: $z-index-hero-square;
}
</style>
