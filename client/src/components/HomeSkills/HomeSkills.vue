<template>
  <section
    id="skills"
    class="skills"
  >
    <home-skills-list
      :skills-list="skillsList"
    />
<!--    <transition-->
<!--      name="modal-animation"-->
<!--    >-->
<!--      <home-skills-modal-->
<!--        v-if="isSkillOpened"-->
<!--        :skill-detail-close="skillDetailClose"-->
<!--      />-->
<!--    </transition>-->
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: color .5s, background-color .5s;
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
