<template>
  <div
    class="works__item"
  >
    <!--        :style="{backgroundImage: `url(${props.work.picture})` || 'none'}"-->
    <picture v-if="props.work.picture">
      <source
        :srcset="props.work.picture"
        type="image/png"
      >
      <img
        :src="props.work.picture"
        alt="user"
        class="works__image"
      >
    </picture>
    <div>
      {{ props.work.title }}
    </div>
  </div>
</template>

<script lang='ts' setup>
import Work from '@/models/Work'

interface Props {
  work: Work
}

const props = defineProps<Props>()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.works__item {
  align-items: center;
  background-color: $bg-mute;
  border-radius: 4px;
  display: flex;
  min-height: calc(var(--max-width) / 2 - 6px);
  justify-content: center;
  transition: background-color 0.5s ease 0s;
  text-align: center;

  &:hover {
    background-color: $bg-soft;
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
  filter: grayscale(1);
}

.works__image {
  max-height: calc(var(--max-width) / 2 - 20px);
  max-width: calc(var(--max-width) - 30px);
}
</style>
