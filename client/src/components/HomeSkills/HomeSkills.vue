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

<script>
import HomeSkillsList from '@/components/HomeSkillsList/HomeSkillsList.vue'
import HomeSkillsModal from '@/components/HomeSkillsModal/HomeSkillsModal'
import { computed } from 'vue'
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'HomeSkills',
  components: {
    HomeSkillsList,
    HomeSkillsModal
  },
  setup() {
    const router = useRouter()
    const route = useRoute()
    const store = useStore()

    const skillsList = computed(() => store.state.skills.skillsList)
    const isSkillOpened = computed(() => store.state.skills.isSkillOpened)
    const skillOpened = computed(() => store.state.skills.skillOpened)
    const switchSkillCondition = async (value) => await store.dispatch('skills/switchSkillCondition', value)
    const switchOpenedSkill = async (value) => await store.dispatch('skills/switchOpenedSkill', value)

    onBeforeRouteUpdate(async (to, from) => {
      if (to.query !== from.query) {
        await switchOpenedSkill(to.query)
      }
    })

    console.log(route.hash)

    if (route.query.skill) {
      switchSkillCondition()
      document.body.classList.add('modal-open')
      switchOpenedSkill(route.query)
    }

    const skillDetailOpen = (skill) => {
      router.push({ query: { skill: skill.url }, hash: route.hash })
      switchSkillCondition()
      document.body.classList.add('modal-open')
    }

    const skillDetailClose = () => {
      switchSkillCondition()
      document.body.classList.remove('modal-open')
      router.push({ path: '/', hash: route.hash })
    }

    return {
      skillDetailOpen,
      skillDetailClose,
      skillsList,
      isSkillOpened,
      skillOpened
    }
  }
}
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
  background-color: $bg;
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
