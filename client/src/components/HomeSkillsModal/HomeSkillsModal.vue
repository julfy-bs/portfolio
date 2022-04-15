<template>
  <div
    class="skills__modal"
    @click.self="skillClose"
  >
    <div class="modal__content">
      <div>
        {{ skillDetailed }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
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
    const store = useStore()
    const skillDetailed = computed(() => store.getters['skills/skillDetailed'])
    const skillClose = () => props.skillDetailClose()

    return {
      skillClose,
      skillDetailed
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills__modal {
  //z-index: $z-index-backdrop;
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
  background-color: $bg-mute;
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 48px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color .5s, color .5s;
  cursor: auto;
}
</style>
