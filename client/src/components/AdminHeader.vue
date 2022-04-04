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
      <div class="header__nav">
        <div class="header__nav-location">
          Панель администрирования
        </div>
        <button
          type="button"
          class="header__nav-logout"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AdminHeader',
  methods: {
    logout() {
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.header {
  width: 100%;
  height: 80px;
  background-color: $dark-blue;
  // todo: color
  //color: $white;
}

.header__container {
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

.user, .header__nav {
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

.header__nav {
  justify-content: space-between;
  flex: 1 1 80%;
  font-size: 14px;
  font-weight: 400;
}

.header__nav-location {
  opacity: .5;
}

.header__nav-logout {
  background: transparent;
  border: none;
  color: $text-2;
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
