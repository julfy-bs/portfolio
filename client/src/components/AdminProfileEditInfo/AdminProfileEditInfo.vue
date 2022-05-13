<template>
  <div class="profile__edit">
    <div class="edit__header">
      <h3>
        Change user information
      </h3>
      <div class="edit__controls">
        <element-button
          v-if="!editing"
          role="edit"
          @click="toggleEdit"
        >
          Edit
        </element-button>
        <element-button
          v-else
          role="save"
          @click="toggleEdit"
        >
          Save
        </element-button>
        <element-button
          role="delete"
        >
          Delete
        </element-button>
      </div>
    </div>
    <div class="edit__body">
      <h4>
        Actual data about user
      </h4>
    </div>
    <div
      v-if="editing"
      class="edit__inputs"
    >
      <element-input
        name="name"
        type="text"
      />
      <element-input
        name="surname"
        type="text"
      />
      <element-input
        name="city"
        type="city"
      />
      <element-input
        name="age"
        type="number"
      />
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementInput from '@/components/UI/ElementInput/ElementInput.vue'
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'
import { ref } from 'vue'

const editing = ref<boolean>(false)

const toggleEdit = (): void => {
  editing.value = !editing.value
}
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.profile__edit {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  gap: 1rem;
  width: 100%;

  .edit__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    h3 {
      color: $text-1;
    }

    .edit__controls {
      display: flex;
      gap: .5rem;
    }
  }

  .edit__inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(#{$info-max-width}, 1fr));
    gap: 1rem;
  }
}
</style>
