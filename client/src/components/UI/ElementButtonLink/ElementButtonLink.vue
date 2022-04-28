<template>
  <router-link
    :to="link"
    target="_blank"
    class="ui__link"
  >
    <slot />
  </router-link>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.ui__link {
  width: 100%;
  text-align: center;
  display: inline-block;
  background-color: $bg-mute;
  padding: 8px 18px;
  font-weight: 500;
  margin: 2px 0;
  border-radius: 8px;
  transition: background-color .5s, color .5s;
  font-size: 12px;

  &:hover {
    background-color: $gray-4;
    transition-duration: .2s;
  }
}
</style>
