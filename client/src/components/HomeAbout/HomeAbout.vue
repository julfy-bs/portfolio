<template>
  <section
    id="about"
    class="about"
  >
    <div class="info">
      <div class="info__image">
        <img
          src="../../static/images/user.jpg"
          alt="Фото профиля"
          class="info__photo"
        >
      </div>
      <div class="info__table">
        <div class="info__cell city">
          <span class="info__title">Город</span>
          <span class="info__value">Москва</span>
        </div>
        <div class="info__cell age">
          <span class="info__title">Возраст</span>
          <span class="info__value">25</span>
        </div>
        <div class="info__cell birth">
          <span class="info__title">Дата рождения</span>
          <span class="info__value">13.12.1996</span>
        </div>
      </div>
    </div>
    <div class="description">
      <div class="description__intro">
        Привет, меня зовут
      </div>
      <div class="description__name">
        Богдан Сутужко
      </div>
      <div class="description__block">
        Я занимаюсь разработкой современных сайтов и приложений. Мне нравится делать интересные и
        современные проекты.
      </div>
      <div class="description__block">
        <button class="home-button">
          <router-link
            to="/resume"
            target="_blank"
            class="description__link"
          >
            Ссылка на резюме
          </router-link>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'HomeAbout',
  components: {}

}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.about {
  color: $text-2;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;
  justify-content: space-between;
  background-color: $bg;
  transition: color .5s, background-color .5s;

  @media (min-width: $tablets) {
    flex-direction: row;
  }
}

.info, .description {
  display: flex;
  flex-direction: column;
}

.info + .description {
  margin-bottom: 48px;

  @media (min-width: $tablets) {
    margin-left: 48px;
  }
}

.info {
  align-items: center;
  flex-grow: .1;
  padding: 0 5vw;

  @media (min-width: $tablets) {
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
    }

    .info__value {
    }
  }
}

.description {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: color .5s, background-color .5s;
  border-radius: 8px;
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  padding: 0 3vw;

  @media (min-width: $tablets) {
    padding: 0;
  }

  .description__intro {
    text-align: center;

    @media (min-width: $tablets) {
      text-align: left;
    }
  }

  .description__intro + .description__name {
    margin-top: 10px;

    @media (min-width: $tablets) {
      margin-top: 24px;
    }
  }

  .description__name {
    color: $text-1;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;

    @media (min-width: $tablets) {
      text-align: left;
    }
  }

  .description__name + .description__block {
    margin-top: 24px;
  }

  .description__block {
    text-align: center;

    @media (min-width: $tablets) {
      text-align: left;
    }

    .description__link {
      display: inline-block;
      background-color: $bg-mute;
      padding: 8px 18px;
      font-weight: 500;
      border-radius: 8px;
      transition: background-color .5s, color .5s;

      &:hover {
        background-color: $gray-4;
        transition-duration: .2s;
      }
    }
  }

  .description__block + .description__block {
    margin-top: 24px;
  }
}
</style>
