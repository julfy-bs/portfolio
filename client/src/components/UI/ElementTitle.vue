<template>
  <h1
    :class="className"
    class="title"
  >
    <slot />
  </h1>
</template>

<script>
export default {
  name: 'ElementTitle',
  props: {
    className: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.title {
  font-weight: 600;
  font-size: 21px;
  color: $gray;

}
</style>
