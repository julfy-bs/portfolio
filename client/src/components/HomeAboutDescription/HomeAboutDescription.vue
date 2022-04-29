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
      <element-button-link
        :link="`https://julfy.notion.site/Resume-565f39bdd17d404e9f1394f48fb01f66`"
      >
        Ссылка на резюме
      </element-button-link>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementButtonLink from '@/components/UI/ElementButtonLink/ElementButtonLink.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.description {
  display: flex;
  flex-direction: column;
  background-color: transparent;
  transition: color .5s, background-color .5s;
  border-radius: 8px;
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;

  .description__intro {
    text-align: center;

    @media (min-width: $tablets-big) {
      text-align: left;
    }
  }

  .description__intro + .description__name {
    margin-top: 10px;
  }

  .description__name {
    color: $text-1;
    font-size: 36px;
    font-weight: 700;
    line-height: 1.1;
    text-align: center;

    @media (min-width: $tablets-big) {
      text-align: left;
    }
  }

  .description__codewars-badge {
    transition: color .5s, background-color .5s, fill .5s, outline-color .5s;
  }

  .description__name + .description__block {
    margin-top: 24px;
  }

  .description__block {
    text-align: center;

    @media (min-width: $tablets) {
      text-align: left;
    }
  }

  .description__block + .description__block {
    margin-top: 24px;
  }
}
</style>
