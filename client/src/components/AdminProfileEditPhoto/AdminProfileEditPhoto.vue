<template>
  <div class="profile__edit photo">
    <h3>
      Change user photo
    </h3>
    <div
      class="photo__placeholder"
    >
      <div class="placeholder__top" />
      <div class="placeholder__bottom" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementInput from '@/components/UI/ElementInput/ElementInput.vue'
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.photo {
  max-width: 200px;

  .photo__placeholder {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 1px solid $divider-2;
    position: relative;
    color: $text-4;

    .placeholder__top, .placeholder__bottom {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 16px;
      height: 2px;
      background-color: currentColor;
      transition: top .25s, background-color .5s, transform .25s;
    }

    .placeholder__top {
      transform: translate(-50%) rotate(90deg);
    }

    .placeholder__bottom {
      transform: translate(-50%) rotate(180deg);
    }
  }
}
</style>
