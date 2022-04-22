import Skill from '@/models/Skill'

// <div
//   class="skills__list"
// @drop="onDrop($event, props.skillsList)"
// @dragenter.prevent
// @dragover.prevent
// >
// <home-skills-item
// v-for="skill in props.skillsList"
//   :key="skill.id"
// :skill="skill"
// draggable="true"
// @dragstart="dragStart($event, skill)"
// @dragenter="dragEnter($event)"
// @dragleave="dragLeave($event)"
// @dragend="dragEnd($event)"
// @click="skillOpen(skill)"
//   />

export const useDragDrop = () => {
  const dragStart = (event: DragEvent, item: Skill) => {
    const dataTransfer = event.dataTransfer as DataTransfer
    dataTransfer.setData('item', item.title)
    const target = event.target as HTMLDivElement
    (target.parentElement as HTMLElement).classList.add('drag__list--active')
  }

  const dragEnter = (event: Event) => {
    const target = event.target as HTMLSpanElement
    target.classList.add('drag__item--active')
  }

  const dragLeave = (event: Event) => {
    const target = event.target as HTMLSpanElement
    target.classList.remove('drag__item--active')
  }

  const dragEnd = (event: Event) => {
    const target = event.target as HTMLSpanElement
    (target.parentElement as HTMLElement).classList.remove('drag__list--active')
  }

  const onDrop = (event: DragEvent, list: Array<Skill>) => {
    const dataTransfer = event.dataTransfer as DataTransfer
    const elementId: string = dataTransfer.getData('item')
    const element: Skill = list.find(item => elementId === item.title) as Skill
    const elementIndex: number = list.findIndex(item => elementId === item.title)
    const target = event.target as HTMLElement

    const skillsListClass = target.classList.contains('skills__list')
    const skillsItemClass = target.classList.contains('skills__item')
    const skillsItemIndex: number = list.findIndex(item => target.textContent === item.title)
    list.splice(elementIndex, 1)

    if (event.target && skillsListClass) {
      list.push(element)
    } else if (event.target && skillsItemClass) {
      target.classList.remove('drag__item--active')
      list.splice(skillsItemIndex, 0, element)
    } else {
      // todo: Отработать ошибки
      throw new Error('Произошла ошибка при взаимодействии с навыками!')
    }
  }

  return {
    dragStart,
    dragEnter,
    dragLeave,
    dragEnd,
    onDrop
  }
}
