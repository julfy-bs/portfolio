<template>
  <div
    class="skills__list"
    @drop="onDrop($event, skillsList)"
    @dragenter.prevent
    @dragover.prevent
  >
    <home-skills-item
      v-for="skill in skillsList"
      :key="skill.id"
      :skill="skill"
      draggable="true"
      @dragstart="dragStart($event, skill)"
      @dragenter="dragEnter($event, skill)"
      @dragleave="dragLeave($event, skill)"
      @dragend="dragEnd($event)"
      @click="skillOpen(skill)"
    />
  </div>
</template>

<script>
import HomeSkillsItem from '@/components/HomeSkillsItem/HomeSkillsItem.vue'

export default {
  name: 'HomeSkillsList',
  components: {
    HomeSkillsItem
  },
  props: {
    skillsList: {
      type: Array,
      required: true
    },
    skillDetailOpen: {
      type: Function,
      required: true
    }
  },
  emits: {},
  setup(props) {
    const skillOpen = (skill) => {
      props.skillDetailOpen(skill)
    }

    const drag = (item) => {
      console.log(item)
    }

    const dragStart = (event, item) => {
      event.dataTransfer.setData('item', item.id)
      event.target.parentElement.classList.add('drag__list--active')
    }

    const dragEnter = (event) => {
      event.target.classList.add('drag__item--active')
    }

    const dragLeave = (event) => {
      event.target.classList.remove('drag__item--active')
    }

    const dragEnd = (event) => {
      event.target.parentElement.classList.remove('drag__list--active')
    }

    const onDrop = (event, list) => {
      const elementId = event.dataTransfer.getData('item')
      const element = list.find(item => +elementId === item.id)
      const elementIndex = list.findIndex(item => +elementId === item.id)

      const skillsListClass = event.target.classList.contains('skills__list')
      const skillsItemClass = event.target.classList.contains('skills__item')
      const skillsItemIndex = list.findIndex(item => event.target.textContent === item.title)
      list.splice(elementIndex, 1)

      if (event.target && skillsListClass) {
        list.push(element)
      } else if (event.target && skillsItemClass) {
        event.target.classList.remove('drag__item--active')
        list.splice(skillsItemIndex, 0, element)
      } else {
        throw new Error('Произошла ошибка при взаимодействии с навыками!')
      }
    }

    return {
      skillOpen,
      drag,
      dragStart,
      dragEnter,
      dragLeave,
      dragEnd,
      onDrop
    }
  }
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
