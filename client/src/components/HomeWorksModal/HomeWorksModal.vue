<template>
  <element-modal
    :close-modal="props.workDetailClose"
  >
    <h3 class="modal__heading">
      {{ workDetailed.title }}
    </h3>
    <div class="modal__description">
      {{ workDetailed.url }}
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

.modal__heading {
  font-size: 20px;
  font-weight: 600;
  transition: background-color .5s, color .5s;
  color: $text-1;
}

.modal__description {
  font-size: 14px;
  font-weight: 500;
  transition: background-color .5s, color .5s;
}
</style>
