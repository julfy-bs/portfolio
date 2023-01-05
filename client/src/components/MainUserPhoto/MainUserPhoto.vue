<template>
  <div class="info__image">
    <img
      src="@/static/images/user.jpg"
      alt="User photo"
      class="info__photo"
    >
  </div>
</template>

<script setup lang='ts'>
import { useUser } from '@/hooks/useUser'

const { user } = useUser()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.info__image {
  max-width: 200px;
  max-height: 200px;
  --borderWidth: 50%;
  position: relative;
  background: transparent;
  border-radius: var(--borderWidth);
  z-index: 0;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transform: translate(-50%, -50%);
    height: 200px;
    width: 200px;
    background: $vue-gradient;
    border-radius: calc(2 * var(--borderWidth));
    animation: animation_img_idle 15s ease infinite;
    background-size: 100% 100%;
    z-index: -1;
  }

  .info__photo {
    border: 5px solid transparent;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    position: relative;
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
