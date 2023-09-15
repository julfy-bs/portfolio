<template>
  <div
    class="info__image"
  >
    <img
      v-if="user.photo"
      alt="User photo"
      class="info__photo"
      :src="user.photo"
    >
    <img
      v-else
      alt="User photo"
      class="info__photo"
      src="@/static/images/avatar.png"
    >
  </div>
</template>

<script lang="ts" setup>
import { useUser } from '@/hooks/useUser';

const { user } = useUser();
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.info__image {
  --borderWidth: 50%;
  background: transparent;
  border-radius: var(--borderWidth);
  max-height: 200px;
  max-width: 200px;
  position: relative;
  z-index: #{$z-index-hero-content};


  &:after {
    animation: animation_img_idle 15s ease infinite;
    background: $vue-gradient;
    background-size: 100% 100%;
    border-radius: calc(2 * var(--borderWidth));
    bottom: 0;
    content: '';
    height: 200px;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(-50%, -50%);
    width: 200px;
    z-index: -1;
  }

  .info__photo {
    border: 5px solid transparent;
    border-radius: 50%;
    height: 200px;
    object-fit: cover;
    object-position: center;
    position: relative;
    width: 200px;
  }
}

@keyframes animation_img_idle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
