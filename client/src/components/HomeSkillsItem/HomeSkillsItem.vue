<template>
  <button
    class="skills__item"
  >
    {{ props.skill.title }}
  </button>
</template>

<script setup lang='ts'>
import Skill from '@/models/Skill'
interface Props {
  skill: Skill
}
const props = defineProps<Props>()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills__item {
  text-align: center;
  display: inline-block;
  background-color: $bg-mute;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color .5s, color .5s;
  font-size: 13px;
  margin: 2px 2px;

  &:hover {
    background-color: $gray-4;
    transition-duration: .2s;
  }
}
</style>
