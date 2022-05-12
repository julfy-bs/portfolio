<template>
  <section class="section login">
    <h1 class="login__title">
      Login
    </h1>
    <div class="login__wrapper">
      <form
        action=""
        class="login__form"
        @submit.prevent
      >
        <div class="login__input email">
          <label
            for="nickname"
          >
            Email
          </label>
          <input
            v-model="login.email"
            type="email"
            name="email"
            placeholder="Enter email"
          >
        </div>
        <div class="login__input password">
          <label
            for="password"
          >
            Password
          </label>
          <input
            v-model="login.password"
            type="password"
            name="password"
            placeholder="Enter password"
          >
        </div>
        <button
          class="login__submit"
        >
          Submit
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { ref } from 'vue'

const login = ref({
  email: '',
  password: ''
})
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";


.login {
  height: calc(100vh - #{$header-height});
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  .login__title {
    font-size: 38px;
    letter-spacing: -.02em;
    font-weight: 600;
    margin-bottom: 1rem;
    color: $text-1;
    transition: color 0.25s;
  }

  .login__wrapper {
    min-width: $screen-min-width;
    border: 1px solid $divider-2;
    padding: 28px 32px;
    border-radius: 6px;
    margin: 2px 2px;
    transition: background-color 0.5s, color 0.25s;
  }

  .login__form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }

  .login__input {
    display: flex;
    flex-flow: column nowrap;
    gap: .5rem;
    margin-bottom: 1rem;

    &:last-child {
      margin: 0;
    }

    label {
      transition: color 0.25s;
      color: $text-1;
    }

    input {
      border: 1px solid $divider-2;
      border-radius: 8px;
      padding: 6px 12px;
      transition: color 0.25s;
    }
  }

  .login__submit {
    display: block;
    margin: 0 auto;
    width: 254px;
    text-align: center;
    background-color: $brand-vue;
    color: $bg;
    padding: 7px 24px;
    font-weight: 600;
    border-radius: 6px;
    transition: background-color .5s,color .5s;

    &:hover {
      background-color: $brand-vue-dark;
    }
  }
}
</style>
