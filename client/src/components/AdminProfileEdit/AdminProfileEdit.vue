<template>
  <div class="profile__edit">
    <div class="user">
      <div class="user__main">
        <div class="user__sidebar">
          <admin-profile-edit-photo />
        </div>
        <div class="user__body">
          <div class="user__group">
            <h4>information</h4>
            <element-input
              name="name"
              type="text"
              :placeholder="user.name"
              store-key="name"
            />

            <element-input
              name="surname"
              type="text"
              :placeholder="user.surname"
              store-key="surname"
            />
            <element-input
              name="city"
              type="text"
              :placeholder="user.city"
              store-key="city"
            />

            <element-input
              name="date of birth"
              type="date"
              :placeholder="user.dateOfBirth"
              store-key="dateOfBirth"
            />
            <element-textarea
              name="description"
              :placeholder="user.description"
              store-key="description"
            />
          </div>
          <div class="user__group">
            <h4>links</h4>
            <element-input
              name="telegram"
              type="text"
              :placeholder="user.telegram"
              store-key="telegram"
            />
            <element-input
              name="github"
              type="text"
              :placeholder="user.github"
              store-key="github"
            />
            <element-input
              name="codewars"
              type="text"
              :placeholder="user.codewars"
              store-key="codewars"
            />
            <element-input
              name="discord"
              type="text"
              :placeholder="user.discord"
              store-key="discord"
            />
          </div>
        </div>
      </div>
      <div class="user__footer">
        <admin-profile-edit-controls @click="pushUser(user)" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementInput from '@/components/UI/ElementInput/ElementInput.vue'
import ElementTextarea from '@/components/UI/ElementTextarea/ElementTextarea.vue'
import AdminProfileEditPhoto from '@/components/AdminProfileEditPhoto/AdminProfileEditPhoto.vue'
import AdminProfileEditControls from '@/components/AdminProfileEditControls/AdminProfileEditControls.vue'
import { useUser } from '@/hooks/useUser'

const { user, pushUser } = useUser()
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.profile__edit {
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 auto;
  gap: 1rem;
  width: 100%;

  .user {
    display: flex;
    flex-flow: column nowrap;
    gap: 1rem;

    .user__main {
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      gap: 1rem;

      @media (min-width: $tablets) {
        flex-flow: row nowrap;
        align-items: flex-start;
      }

      .user__sidebar, .user__body {
        display: flex;
        flex-flow: column nowrap;
        gap: 1rem;
      }

      .user__sidebar {
        flex: 0 1 auto;
      }

      .user__body {
        flex: 1 1 auto;
        width: 100%;

        @media (min-width: $tablets) {
          width: auto;
        }

        .user__group {
          display: flex;
          flex-flow: column nowrap;
          gap: .5rem;

          h4 {
            line-height: 28px;
            font-size: 16px;
            font-weight: 600;
            color: $text-3;
            text-transform: uppercase;
            transition: color .25s;
          }
        }
      }
    }
  }

  .edit__inputs {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(#{$info-max-width}, 1fr));
    gap: 1rem;
  }
}
</style>
