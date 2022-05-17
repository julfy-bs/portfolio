<template>
  <div class="profile__edit photo">
    <div
      v-if="user.photo"
      class="photo__actual"
    >
      <main-user-photo />
      <div class="photo__add">
        <input
          ref="file"
          type="file"
          @change="updatePhoto"
        >
        <element-button
          role="add"
          @click="changePhoto"
        >
          Change photo
        </element-button>
      </div>
    </div>
    <div
      v-else
      class="photo__placeholder"
    >
      <div class="placeholder__top" />
      <div class="placeholder__bottom" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'
import MainUserPhoto from '@/components/MainUserPhoto/MainUserPhoto.vue'
import { ref } from 'vue'
import { useUser } from '@/hooks/useUser'
// todo: drag&drop
const file = ref()
const {user, updateStore} = useUser()
const changePhoto = (): void => {
  if(file.value) {
    file.value.click()
  }
}
const updatePhoto = () => {
  if(file.value) {
    console.log(file.value.files[0].name)
    updateStore('photo', file.value.files[0].name)
  }
}
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.photo {
  max-width: 200px;

  .photo__actual {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    input {
      display: none;
      opacity: 0;
      color: transparent;
    }
  }

  .photo__placeholder {
    border-radius: 50%;
    width: 200px;
    height: 200px;
    border: 1px solid $divider-2;
    position: relative;
    color: $text-4;

    .placeholder__top, .placeholder__bottom {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 16px;
      height: 2px;
      background-color: currentColor;
      transition: top .25s, background-color .5s, transform .25s;
    }

    .placeholder__top {
      transform: translate(-50%) rotate(90deg);
    }

    .placeholder__bottom {
      transform: translate(-50%) rotate(180deg);
    }
  }
}
</style>
