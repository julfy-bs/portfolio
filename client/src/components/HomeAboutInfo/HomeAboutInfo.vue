<template>
  <div class="info">
    <main-user-photo />
    <div class="info__table">
      <div class="info__cell city">
        <span class="info__title">City</span>
        <span class="info__value">{{ user.city }}</span>
      </div>
      <div class="info__cell age">
        <span class="info__title">Age</span>
        <span class="info__value">{{ countAge(user.dateOfBirth) }}</span>
      </div>
      <div class="info__cell birth">
        <span class="info__title">Date of Birth</span>
        <span class="info__value">{{ formatDate(user.dateOfBirth) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import MainUserPhoto from '@/components/MainUserPhoto/MainUserPhoto.vue'
import { countAge } from '@/helpers/countAge'
import { useUser } from '@/hooks/useUser'
import { formatDate } from '@/helpers/formatDate'

const { user } = useUser()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.info {
  align-items: center;
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;

  @media (min-width: $phones) {
    margin-bottom: 48px;
  }

  @media (min-width: $tablets-big) {
    max-width: 350px;
    margin: 0;
    padding: 0;
  }

  .info__table {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
  }

  .info__cell {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .info__title {
      color: $text-1;

      &::after {
        content: ':';
      }
    }

    .info__title, .info__value {
      transition: color .5s;
      width: 50%;
    }

    .info__value {
      text-align: right;
    }
  }
}
</style>
