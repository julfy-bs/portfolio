<template>
  <div class="banner banner_active">
    <span>Сайт в разработке. Скоро тут все будет красиво и современно. 🔥</span>
  </div>
</template>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.banner {
  background: #{$vue-gradient};
  color: #d6ffec;
  display: none;
  font-size: 14px;
  z-index: #{$z-index-banner};
  text-align: center;
  padding: 10px 60px;

  &_active {
    display: block;
  }

  @media (min-width: $tablets-big) {
    box-sizing: border-box;
    min-height: 40px;
    font-size: 16px;
  }
}
</style>
