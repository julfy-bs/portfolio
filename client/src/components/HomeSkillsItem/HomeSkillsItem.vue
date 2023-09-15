<template>
  <img
    :src="props.skill.picture"
    class="skills__item"
    :alt="props.skill.title"
  >
</template>

<script setup lang="ts">
import Skill from '@/models/Skill';

interface Props {
  skill: Skill;
}

const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.skills__item {
  text-align: center;
  display: inline-block;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color .5s, color .5s;
  font-size: 13px;
  margin: 2px 2px;
  width: 100%;

  &:hover {
    background-color: $gray-4;
    transition-duration: .2s;
  }
}
</style>
