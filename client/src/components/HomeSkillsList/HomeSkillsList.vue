<template>
  <div
    class="skills__list"
  >
    <home-skills-item
      v-for="skill in props.skillsList"
      :key="skill.id"
      :skill="skill"
      @click="skillOpen(skill)"
    />
  </div>
</template>

<script setup lang='ts'>
import HomeSkillsItem from '@/components/HomeSkillsItem/HomeSkillsItem.vue'
import Skill from '@/models/Skill'

interface Props {
  skillsList: Array<Skill>
  skillDetailOpen: Function
}

const props = defineProps<Props>()

const skillOpen = (skill: Skill) => {
  props.skillDetailOpen(skill)
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  padding: 10px;
  margin: 0 -14px;
}

.drag__list--active {
  background-color: $bg-soft;
}

.drag__item--active {
  background-color: $hover-link-color;
}
</style>
