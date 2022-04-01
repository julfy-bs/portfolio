<template>
  <nav class="navigation">
    <ul class="navigation__list">
      <li class="navigation__item">
        <a
          href="#header"
          class="navigation__link"
        >
          Главная
        </a>
      </li>
      <li class="navigation__item">
        <a
          href="#main"
          class="navigation__link"
        >
          Обо мне
        </a>
      </li>
      <li class="navigation__item">
        <a
          href=""
          class="navigation__link"
        >
          Навыки
        </a>
      </li>
      <li class="navigation__item">
        <a
          href=""
          class="navigation__link"
        >
          Работы
        </a>
      </li>
      <li class="navigation__item">
        <a
          href=""
          class="navigation__link"
        >
          Отзывы
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'HomeNavigation'
}
</script>

<style lang='scss' scoped>
.navigation__list {
  display: flex;
}

.navigation__item {
  padding: 0 30px;
}

.navigation__link {
  transition: color .25s;

  &:hover {
    color: $hover-color;
  }
}
</style>
