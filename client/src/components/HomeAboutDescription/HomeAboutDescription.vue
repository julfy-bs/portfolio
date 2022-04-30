<template>
  <div class="description">
    <div class="description__intro">
      Hi, my name is
    </div>
    <div class="description__name">
      Bogdan Sutuzhko
    </div>
    <div class="description__block">
      I am a front-end developer based in Moscow. My focus area for the past few years has been
      front-end development with Vue. <br><br> My passion is developing modern websites and
      applications. I get pleasure when I create interesting and modern applications. <br> <br> I am currently looking for a job as a Junior Frontend
      developer.  <br> I haven't had to work as a Frontend developer yet, but at the moment I
      have
      all the necessary knowledge and skills to work effectively as a Junior Frontend developer.
    </div>
    <div class="description__block">
      <element-button-link
        :link="`https://julfy.notion.site/Resume-565f39bdd17d404e9f1394f48fb01f66`"
      >
        CV
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
