<template>
  <div class="profile__edit links">
    <h3>
      Change user link's paths
    </h3>
    <div class="info__wrapper">
      <element-input
        name="telegram"
        type="text"
      />
      <element-input
        name="github"
        type="text"
      />
      <element-input
        name="codewars"
        type="city"
      />
      <element-input
        name="discord"
        type="number"
      />
      <element-button>
        Save
      </element-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementInput from '@/components/UI/ElementInput/ElementInput.vue'
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

</style>
