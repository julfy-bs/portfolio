<template>
  <element-modal
    :close-modal="props.skillDetailClose"
  >
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
  </element-modal>
</template>

<script setup lang='ts'>
import ElementModal from '@/components/UI/ElementModal/ElementModal.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'

interface Props {
  skillDetailClose: Function
}
const props = defineProps<Props>()
const store = useStore()
const skillDetailed = computed(() => store.getters['skills/skillDetailed'])
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

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
