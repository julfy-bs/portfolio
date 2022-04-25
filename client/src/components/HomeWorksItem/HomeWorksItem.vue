<template>
  <div
    class="works__item"
  >
    <picture v-if="props.work.picture">
      <source
        :srcset="props.work.picture"
        type="image/png"
      >
      <img
        src="@/static/images/among-us.png"
        alt="user"
        class="works__image"
      >
    </picture>
    <div v-else>
      {{ props.work.title }}
    </div>
  </div>
</template>

<script setup lang='ts'>
import Work from '@/models/Work'

interface Props {
  work: Work
}

const props = defineProps<Props>()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.works__item {
  background-color: $bg-soft;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(var(--max-width) / 2 - 6px);
  margin: 2px 0;
  border-radius: 3px;
  transition: background-color 0.2s ease 0s;

  &:hover {
    background-color: $bg-mute;
  }
}

.dark-theme .works__item {
  &:hover {
    .works__image {
      filter: none;
    }
  }
}

.dark-theme .works__image {
  filter: grayscale(1) invert(1);
}

.works__image {
  max-width: calc(var(--max-width) - 30px);
  max-height: calc(var(--max-width) / 2 - 20px);
}
</style>
