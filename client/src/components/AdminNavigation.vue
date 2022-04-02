<template>
  <div class="nav">
    <div class="container nav__container">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link
            to="/admin/about"
            class="nav__link"
          >
            Обо мне
          </router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/admin/works"
            class="nav__link"
          >
            Работы
          </router-link>
        </li>
        <li class="nav__item">
          <router-link
            to="/admin/reviews"
            class="nav__link"
          >
            Отзывы
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminNavigation'
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.nav {
  height: 78px;
}

.nav__container {
  height: 100%;
}

.nav__list {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  list-style: none;
}

.nav__item {
  text-align: center;
}

.nav__link {
  min-width: 125px;
  padding: 25px 35px;
  border-bottom: 3px solid transparent;
  text-decoration: none;

  &:-webkit-any-link {
    color: inherit;
  }
}

.router-link-active {
  color: #383bcf;
  border-bottom: 3px solid #383bcf;

  &:-webkit-any-link {
    color: #383bcf;
  }
}
</style>
