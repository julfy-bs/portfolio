<template>
  <div class="info">
    <div class="info__image">
      <img
        src="@/static/images/user.jpg"
        alt="Фото профиля"
        class="info__photo"
      >
    </div>
    <div class="info__table">
      <div class="info__cell city">
        <span class="info__title">City</span>
        <span class="info__value">Moscow</span>
      </div>
      <div class="info__cell age">
        <span class="info__title">Age</span>
        <span class="info__value">25</span>
      </div>
      <div class="info__cell birth">
        <span class="info__title">Date of Birth</span>
        <span class="info__value">December 13, 1996</span>
      </div>
    </div>
  </div>
</template>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.info {
  align-items: center;
  width: 100%;

  @media (min-width: $phones) {
    margin-bottom: 48px;
  }

  @media (min-width: $tablets-big) {
    max-width: 350px;
    margin: 0;
    padding: 0;
  }

  .info__image {
    max-width: 200px;
    max-height: 200px;

    .info__photo {
      object-fit: cover;
      object-position: center;
      border-radius: 50%;
      width: 200px;
      height: 200px;
    }
  }

  .info__image + .info__table {
    margin-top: 24px;
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
