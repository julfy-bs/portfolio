<template>
  <element-modal
    :close-modal="props.workDetailClose"
  >
    <div class="modal__header">
      <h3 class="modal__heading">
        {{ workDetailed.title }}
      </h3>
      <a
        class="modal__link"
        :href="workDetailed.url"
        target="_blank"
      >
        Ссылка на сайт
      </a>
    </div>
    <div class="modal__description">
      <div class="modal__component-list">
        <span
          v-for="component in workDetailed.skills"
          :key="component.id"
          class="modal__component"
        >
          {{ component.title }}
        </span>
      </div>
      {{ workDetailed.description }}
      <span v-html="workDetailed.html"></span>
      <img class="modal__image" :src="workDetailed.picture" alt="">
    </div>
  </element-modal>
</template>

<script setup lang='ts'>
import ElementModal from '@/components/UI/ElementModal/ElementModal.vue'
import { useStore } from 'vuex'
import { computed } from 'vue'

interface Props {
  workDetailClose: Function
}

const props = defineProps<Props>()

const store = useStore()
const workDetailed = computed(() => store.getters['works/workDetailed'])
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.modal__header {
  display: flex;
  flex-direction: column;
}

.modal__heading {
  font-size: 20px;
  font-weight: 600;
  transition: background-color .5s, color .5s;
  color: $text-1;
  margin-bottom: 10px;
}

.modal__link {
  width: fit-content;
  transition: background-color .5s, color .25s;

  &:hover {
    color: $hover-link-color
  }
}

.modal__component-list {
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0 0;
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
  display: flex;
  flex-direction: column;
  gap: 14px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color .5s, color .5s;
}

.modal__image {
  width: 100%;
  height: auto;
}
</style>
