<template>
  <section
    id="works"
    class="works"
  >
    <h2 class="works__heading">
      My Works
    </h2>
    <home-works-list
      :works-list="worksList"
      :work-detail-open="workDetailOpen"
    />
    <transition
      name="modal-animation"
    >
      <home-works-modal
        v-if="isWorkOpened"
        :work-detail-close="workDetailClose"
      />
    </transition>
  </section>
</template>

<script setup lang='ts'>
import HomeWorksList from '@/components/HomeWorksList/HomeWorksList.vue'
import HomeWorksModal from '@/components/HomeWorksModal/HomeWorksModal.vue'
import { useWorks } from '@/hooks/useWorks'
const { workDetailOpen, workDetailClose, worksList, isWorkOpened } = useWorks()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.works {
  color: $text-2;
  transition: color .5s, background-color .5s;
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
