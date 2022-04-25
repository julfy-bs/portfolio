<template>
  <div
    class="modal"
    @click.self="props.closeModal"
  >
    <div class="modal__wrapper">
      <div class="modal__content">
        <button
          class="button"
          @click="props.closeModal"
        >
          <span class="button__container">
            <span class="button__top" />
            <span class="button__bottom" />
          </span>
        </button>
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
interface Props {
  closeModal: Function
}

const props = defineProps<Props>()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.modal {
  z-index: $z-index-backdrop;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $bg;
  transition: background-color .5s, color .5s;
  overflow-y: auto;

  &:hover {
    cursor: pointer;
  }
}

.modal__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 35px 15px;
  margin: 0 auto;

  @media (min-width: $tablets) {
    max-width: 670px;
    padding: 55px 0;
  }

  @media (min-width: $desktop) {
    max-width: 960px;
  }
}

.modal__content {
  position: relative;
  background-color: $bg-soft;
  padding: 24px 32px;
  font-weight: 500;
  border-radius: 8px;
  transition: background-color .5s, color .5s;
  cursor: auto;
  color: $text-2;
  display: flex;
  flex-flow: column nowrap;
  height: 100%;

  @media (min-width: $phones) {
    min-width: 300px;
  }
}

.button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 58px;
  position: absolute;
  right: 32px;
  top: 6px;
}


.button__container {
  position: relative;
  width: 16px;
  height: 14px;
  overflow: hidden;
}

.button__top, .button__bottom {
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: $text-1;
  transition: top .25s, background-color .5s, transform .25s;
}

.button__top {
  top: 0;
  left: 0;
  transform: translate(0);
}

.button__bottom {
  top: 12px;
  left: 0;
  transform: translate(4px);
}

.button .button__container .button__top {
  top: 6px;
  transform: translate(0) rotate(225deg);
}

.button .button__container .button__bottom {
  top: 6px;
  transform: translate(0) rotate(135deg);
}

.button:hover .button__top {
  transform: translate(0) rotate(225deg) scale(1.3);
}

.button:hover .button__bottom {
  transform: translate(0) rotate(135deg) scale(1.3);
}
</style>
