<template>
  <div class="info">
    <main-user-photo />
    <div class="info__table">
      <div class="info__cell city">
        <span class="info__title">Город</span>
        <span class="info__value">{{ user.city }}</span>
      </div>
      <div class="info__cell age">
        <span class="info__title">Возраст</span>
        <span class="info__value">{{ countAge(user.dateOfBirth) }}</span>
      </div>
      <div class="info__cell birth">
        <span class="info__title">Дата рождения</span>
        <span class="info__value">{{ formatDate(user.dateOfBirth) }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MainUserPhoto from '@/components/MainUserPhoto/MainUserPhoto.vue';
import { countAge } from '@/helpers/countAge';
import { useUser } from '@/hooks/useUser';
import { formatDate } from '@/helpers/formatDate';

const { user } = useUser();
</script>

<style lang="scss" scoped>
@import "src/assets/styles/_variables.scss";

.info {
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  gap: 24px;
  width: 100%;

  @media (min-width: $phones) {
    margin-bottom: 48px;
  }

  @media (min-width: $tablets-big) {
    margin: 0;
    max-width: 350px;
    padding: 0;
  }

  .info__table {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    width: 100%;
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
      max-width: 50%;
      transition: color .5s;
      width: fit-content;
      z-index: #{$z-index-hero-content};
    }

    .info__value {
      text-align: right;
    }
  }
}
</style>
