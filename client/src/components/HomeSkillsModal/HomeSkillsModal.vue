<template>
  <div
    class="skills__modal"
    @click.self="skillClose"
  >
    <div class="modal__content">
      <h3 class="modal__heading">
        {{ skillDetailed.title }}
      </h3>
      <div class="modal__component-list">
        <span
          v-for="component in skillDetailed.components"
          :key="component.id"
          class="modal__component"
        >
          {{ component.title }}
        </span>
      </div>
      <div class="modal__description">
        {{ skillDetailed.description }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed} from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'HomeSkillsModal',
  props: {
    skillDetailClose: {
      type: Function,
      required: true
    }
  },
  setup(props) {
    const skillClose = () => props.skillDetailClose()
    const store = useStore()
    const skillDetailed = computed(() => store.getters['skills/skillDetailed'])
    return {
      skillClose,
      skillDetailed
    }
  },
  computed: {
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills__modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  filter: blur(100%);
  background-color: $bg;
  transition: background-color .5s, color .5s;

  &:hover {
    cursor: pointer;
  }
}

.modal__content {
  background-color: $bg-soft;
  max-width: 300px;
  margin: 0 auto;
  padding: 24px 32px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color .5s, color .5s;
  cursor: auto;
  color: $text-2;
  display: flex;
  flex-flow: column wrap;

  @media (min-width: $tablets) {
    max-width: 670px;
  }

  @media (min-width: $desktop) {
    max-width: 960px;
  }
}

.modal__heading {
  font-size: 20px;
  font-weight: 600;
  transition: background-color .5s, color .5s;
  color: $text-1;
}

.modal__component-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
}

.modal__component {
  text-align: center;
  display: inline-block;
  background-color: $bg-mute;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color .5s, color .5s;
  font-size: 12px;
  margin: 2px 2px;
}

.modal__description {
  font-size: 14px;
  font-weight: 500;
  transition: background-color .5s, color .5s;
}
</style>
