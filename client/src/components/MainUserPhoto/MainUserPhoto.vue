<template>
  <div class="info__image">
    <img
      :src="user.photo"
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

  .info__photo {
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    width: 200px;
    height: 200px;
  }
}
</style>
