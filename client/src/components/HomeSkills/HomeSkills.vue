<template>
  <section
    id="skills"
    class="skills"
  >
    <h2 class="skills__heading">
      My Skills
    </h2>
    <div class="skills__list">
      <home-skills-item
        v-for="skill in skillsList"
        :key="skill.id"
        :skill="skill"
        draggable="true"
        @click="skillOpen(skill.title)"
      />
    </div>
  </section>
</template>

<script lang='ts'>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import HomeSkillsItem from '@/components/HomeSkillsItem/HomeSkillsItem.vue'

export default {
  name: 'HomeSkills',
  components: {
    HomeSkillsItem
  },

  setup() {

    const skillsList = ref([
      { id: 0, title: 'skill-1' },
      { id: 1, title: 'skill-2' },
      { id: 2, title: 'skill-3' },
      { id: 3, title: 'skill-4' },
      { id: 4, title: 'skill-5' },
      { id: 5, title: 'skill-6' },
      { id: 6, title: 'skill-7' },
      { id: 7, title: 'skill-8' },
      { id: 8, title: 'skill-9' },
      { id: 9, title: 'skill-10' },
      { id: 10, title: 'skill-11' },
      { id: 11, title: 'skill-12' }, { id: 8, title: 'skill-9' },
      { id: 9, title: 'skill-10' },
      { id: 10, title: 'skill-11' },
      { id: 11, title: 'skill-12' }, { id: 8, title: 'skill-9' },
      { id: 9, title: 'skill-10' },
      { id: 10, title: 'skill-11' },
      { id: 11, title: 'skill-12' }
    ])

    const router = useRouter()

    const skillOpen = (skill: any): void => {
      router.push({ query: { skill } })
    }

    return {
      skillsList, skillOpen
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
  //
  //@media (min-width: $tablets) {
  //  flex-direction: row;
  //  flex-wrap: nowrap;
  //}
}

.skills__heading {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
  color: $text-1;
}

.skills__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: stretch;
  margin: 0 -4px;
}
</style>
