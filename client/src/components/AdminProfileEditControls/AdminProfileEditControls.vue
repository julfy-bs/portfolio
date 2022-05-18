<template>
  <div class="controls">
    <div
      class="controls__wrapper"
    >
      <element-button
        role="save"
      >
        Save
      </element-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  height: 38px;

  .controls__wrapper {
    display: flex;
    gap: .5rem;
  }
}
</style>
