<template>
  <button
    class="skills__item"
  >
    <!--    :class="{'skills__item&#45;&#45;active': isSkillOpened && skill.url === $route.query.skill}"-->
    {{ skill.title }}
  </button>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'HomeSkillsItem',
  props: {
    skill: {
      type: Object,
      required: true
    }
  },
  setup() {
    const route = useRoute()
    const isSkillOpened = ref(false)

    if (route.query.skill) {
      isSkillOpened.value = true
    }

    return {
      isSkillOpened
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skills__item {
  text-align: center;
  display: inline-block;
  background-color: $bg-mute;
  padding: 8px 18px;
  font-weight: 500;
  border-radius: 4px;
  transition: background-color .5s, color .5s;
  font-size: 12px;
  margin: 2px 2px;

  &:hover {
    background-color: $gray-4;
    transition-duration: .2s;
  }
  //
  //&--active {
  //  position: relative;
  //
  //  &::after {
  //    content: '';
  //    position: absolute;
  //    top: 70%;
  //    left: 50%;
  //    transform: translateX(-50%) rotate(180deg);
  //    transition: border-color .5s, color .5s;
  //    border: {
  //      top: 20px solid transparent;
  //      right: 20px solid transparent;
  //      bottom: 20px solid $bg-mute;
  //      left: 20px solid transparent;
  //    }
  //  }
  //
  //  &:hover {
  //    &::after {
  //      content: '';
  //      transition: border-color .2s;
  //      border-bottom: 20px solid $gray-4;
  //    }
  //  }
  //}
}
</style>
