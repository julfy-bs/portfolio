<template>
  <div
    v-if="props.scrollPosition > 650"
    class="scroll-to-top"
    @click="scrollToTop"
  >
    <div class="scroll-to-top__arrow">
      <element-svg
        file-name="arrow"
        class="arrow"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue'

interface Props {
  scrollPosition: number
}

const props = defineProps<Props>()

const scrollToTop = () => {
  window.scrollTo(0, 0)
}
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";
.scroll-to-top {
  position: fixed;
  bottom: 40px;
  right: 12px;

  width: 40px;
  height: 40px;

  background-color: $bg-mute;
  border-radius: 50%;
  overflow: hidden;
  color: $text-2;
  border: 1px solid $divider-2;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: $text-1;
  }

  @media (min-width: $desktop) {
    right: 32px;
  }
}

.arrow {
  width: 15px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(-90deg);
}
</style>
