<template>
  <div
    class="skills__list"
  >
    <home-skills-item
      v-for="skill in props.skillsList"
      :key="skill.id"
      :skill="skill"
    />
  </div>
</template>

<script lang="ts" setup>
import HomeSkillsItem from '@/components/HomeSkillsItem/HomeSkillsItem.vue';
import Skill from '@/models/Skill';

interface Props {
  skillsList: Array<Skill>;
  skillDetailOpen: Function;
}

const props = defineProps<Props>();

const skillOpen = (skill: Skill) => {
  props.skillDetailOpen(skill);
};
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.skills__list {
  display: grid;
  flex-wrap: wrap;
  grid-template-columns: repeat(auto-fill, minmax(65px, 1fr));
  gap: 16px;
  margin: 0 -14px;
  padding: 10px;

}


.drag__list--active {
  background-color: $bg-soft;
}

.drag__item--active {
  background-color: $hover-link-color;
}
</style>
