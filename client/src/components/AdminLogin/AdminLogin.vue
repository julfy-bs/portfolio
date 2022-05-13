<template>
  <section class="admin-section login">
    <h1 class="admin-section__title">
      Login
    </h1>
    <div class="admin-section__wrapper">
      <form
        action=""
        class="login__form"
        @submit.prevent="loginSubmit()"
      >
        <element-input
          name="email"
          type="email"
        />
        <element-input
          name="password"
          type="password"
        />
        <element-button>
          Submit
        </element-button>
      </form>
    </div>
  </section>
</template>

<script setup lang='ts'>
import { useRouter } from 'vue-router'
import ElementInput from '@/components/UI/ElementInput/ElementInput.vue'
import ElementButton from '@/components/UI/ElementButton/ElementButton.vue'

const router = useRouter()
// todo: useLogin
const loginSubmit = () => router.push('profile')
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";


.login {
  height: calc(100vh - #{$header-height});

  @media (min-width: $phones) {
    max-width: 500px;
  }

  @media (min-width: $tablets) {
    max-width: $screen-min-width;
  }

  .login__form {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    gap: 1rem;
  }
}
</style>
