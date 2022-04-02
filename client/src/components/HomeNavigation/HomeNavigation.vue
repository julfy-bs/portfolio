<template>
  <nav class="navigation">
    <a
      href="#header"
      class="navigation__link"
    >
      Главная
    </a>
    <a
      href="#main"
      class="navigation__link"
    >
      Обо мне
    </a>
    <a
      href=""
      class="navigation__link"
    >
      API
    </a>
    <a
      href=""
      class="navigation__link"
    >
      Работы
    </a>
    <a
      href=""
      class="navigation__link"
    >
      Отзывы
    </a>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavigation'
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.navigation {
  display: none;

  @media (min-width: $bp-desktop) {
    display: flex;
  }
}

.navigation__link {
  display: block;
  padding: 0 12px;
  font-size: 13px;
  font-weight: 500;
  line-height: $header-line-height;
  color: $text-link-default-color;
  transition: color .25s;

  &:hover {
    color: $link-hover-color;
  }
}
</style>
