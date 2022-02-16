<template>
  <header class="header">
    <div class="container header__container">
      <div class="user">
        <div class="user__photo-block">
          <img
            class="user__image"
            src="@/static/images/user.jpg"
            alt="user picture"
          >
        </div>
        <div class="user__full-name">
          <span class="user__first-name">Богдан</span>
          <span class="user__second-name">Сутужко</span>
        </div>
      </div>
      <div class="nav">
        <div class="nav__location">
          Панель администрирования
        </div>
        <button
          type="button"
          class="nav__logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader'
}
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 80px;
  background-color: $dark-blue;
  color: $white;
}

.header__container {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.user, .nav {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
}

.user {
  flex: 0 1 20%;
}

.user__photo-block {
  margin-right: 20px;
}

.user__image {
  width: 46px;
  height: 46px;
  border-radius: 50%;
}

.user__full-name {
  font-size: 18px;
  font-weight: 600;
}

.user__first-name {
  margin-right: 5px;
}

.nav {
  justify-content: space-between;
  flex: 1 1 80%;
  font-size: 14px;
  font-weight: 400;
}

.nav__location {
  opacity: .5;
}

.nav__logout {
  background: transparent;
  border: none;
  color: $white;
  padding: 5px;

  &:hover {
    cursor: pointer;
    color: $hover-color;
  }

  &:focus {
    outline: $focus-color auto 1px;
  }
}
</style>
