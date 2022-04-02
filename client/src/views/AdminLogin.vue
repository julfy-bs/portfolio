<template>
  <main>
    <element-dialog>
      <form
        action=""
        class="login"
      >
        <h1 class="login__title">
          Авторизация
        </h1>
        <input-group
          label-title="Логин"
          input-placeholder="Введите логин"
          input-required="required"
          input-class="text-with-svg"
        >
          <element-svg
            file-name="user"
            class-name="icon icon--input"
          />
        </input-group>
        <input-group
          label-title="Пароль"
          input-type="password"
          input-placeholder="Введите пароль"
          input-required="required"
          input-class="text-with-svg"
        >
          <element-svg
            file-name="password"
            class-name="icon icon--input icon--password"
          />
        </input-group>
        <element-button
          button-name="login"
          button-type="submit"
          button-value="login"
          button-class="gradient"
        >
          Отправить
        </element-button>
        <button class="login__btn" />
      </form>
    </element-dialog>
  </main>
</template>

<script>
import InputGroup from '@/components/InputGroup.vue'

export default {
  name: 'AdminLoginPage',
  components: { InputGroup }

}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.login {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  width: 410px;

  &__title {
    font-size: 36px;
    font-weight: 500;
    color: $text-default-color;
    margin-bottom: 34px;
  }
}
</style>
