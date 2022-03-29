<template>
  <div
    v-if="show"
    class="dialog"
  >
    <div class="dialog__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElementDialog',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang='scss' scoped>
.dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(rgba(45, 60, 78, .9), rgba(45, 60, 78, .9)), 100% 20% / cover no-repeat url("../../static/images/dialog-background.png");
  display: flex;

  &__content {
    margin: auto;
    background: $white;
    padding: 30px 80px;
    border-radius: 14px;
    box-shadow: 10px 10px 5px rgba(45, 60, 78, .3);
    display: flex;
  }
}
</style>
