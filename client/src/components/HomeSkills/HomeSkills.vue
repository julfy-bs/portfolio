<template>
  <section
    id="skills"
    class="skills"
  >
    <h2 class="skills__heading">
      My Skills
    </h2>
    <home-skills-list
      :skills-list="skillsList"
      :skill-detail-open="skillDetailOpen"
    />
    <transition
      name="modal-animation"
    >
      <home-skills-modal
        v-if="isSkillOpened"
        :skill-detail-close="skillDetailClose"
      />
    </transition>
  </section>
</template>

<script setup lang='ts'>
import HomeSkillsList from '@/components/HomeSkillsList/HomeSkillsList.vue'
import HomeSkillsModal from '@/components/HomeSkillsModal/HomeSkillsModal.vue'
import { useSkills } from '@/hooks/useSkills'
const { skillDetailOpen, skillDetailClose, skillsList, isSkillOpened } = useSkills()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills {
  color: $text-2;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: color .5s, background-color .5s;
}

.skills__heading {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
  color: $text-1;
}

.modal-animation-enter-active {
  transition: all 0.2s ease-out;
}

.modal-animation-leave-active {
  transition: all 0.2s ease-out;
}

.modal-animation-leave-to {
  transform: translateY(-90px);
  opacity: 0;
}

.modal-animation-enter-from {
  opacity: .3;
  transform: translateY(-40px);
}

.modal-animation-enter {
  opacity: 1;
  transform: translateY(0px);
}

.modal-animation-enter-to {
  opacity: 1;
  transform: translateY(0px);
}
</style>
