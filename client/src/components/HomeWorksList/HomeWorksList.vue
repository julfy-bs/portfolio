<template>
  <div class="works__list">
    <home-works-item
      v-for="work in props.worksList"
      :key="work.id"
      :work="work"
      @click="workOpen(work)"
    />
  </div>
</template>

<script setup lang='ts'>
import HomeWorksItem from '@/components/HomeWorksItem/HomeWorksItem.vue'
import Work from '@/models/Work'

interface Props {
  worksList: Array<Work>
  workDetailOpen: Function
}

const props = defineProps<Props>()

const workOpen = (work: Work) => {
  props.workDetailOpen(work)
}
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.works__list {
  display: grid;
  grid-auto-flow: dense;
  grid-template-columns: repeat(auto-fill, minmax(var(--max-width), 1fr));
  gap: 4px;
}
</style>
