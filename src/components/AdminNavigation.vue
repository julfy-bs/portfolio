<template>
  <div class="nav">
    <div class="container nav__container">
      <ul class="nav__list">
        <li class="nav__item">
          <router-link
            to="/admin/skills"
            class="nav__link"
          >
            Навыки
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
  width: 125px;
  text-align: center;
}

.nav__link {
  width: 125px;
  padding: 25px 35px;
  border-bottom: 3px solid transparent;
  text-decoration: none;

  &:-webkit-any-link {
    color: $gray;
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
