<template>
  <div
    class="logo"
  >
    BS
  </div>
</template>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.logo {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: $header-height;
  transition: opacity .25s;

  font-size: 16px;
  font-weight: 500;
}
</style>
