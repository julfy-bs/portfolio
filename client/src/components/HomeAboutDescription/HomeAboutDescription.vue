<template>
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
</template>

<script>
export default {
  name: 'HomeAboutDescription'
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

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
