<template id="app">
  <div class="app__container">
    <router-view />
    <scroll-to-top :scroll-position="scrollPosition" />
  </div>
</template>

<script setup lang='ts'>
import ScrollToTop from '@/components/UI/ScrollToTop/ScrollToTop.vue'

import { onMounted, ref } from 'vue'

let scrollPosition = ref<number>(window.pageYOffset)
const updateScroll = () => {
  scrollPosition.value = window.scrollY
}

onMounted(() => {
  window.addEventListener('scroll', updateScroll)
})
</script>

<style lang='scss'>
/* General variables */
:root {
  color-scheme: light dark;
  --header-height: 55px;
  --font-family-base: Inter, -apple-system, sans-serif;
  --screen-max-width: 1376px;
  --screen-min-width: 320px;
  --c-white: #ffffff;
  --c-white-soft: #f9f9f9;
  --c-white-mute: #f1f1f1;
  --c-black: #1a1a1a;
  --c-black-pure: #000000;
  --c-black-soft: #242424;
  --c-black-mute: #2f2f2f;
  --c-indigo: #213547;
  --c-indigo-soft: #476582;
  --c-indigo-light: #aac8e4;
  --c-gray: #8e8e8e;
  --c-gray-light-1: #aeaeae;
  --c-gray-light-2: #c7c7c7;
  --c-gray-light-3: #d1d1d1;
  --c-gray-light-4: #e5e5e5;
  --c-gray-light-5: #f2f2f2;
  --c-gray-dark-1: #636363;
  --c-gray-dark-2: #484848;
  --c-gray-dark-3: #3a3a3a;
  --c-gray-dark-4: #282828;
  --c-gray-dark-5: #202020;
  --c-blue-light: #549ced;
  --c-blue-dark: #3468a3;
  --c-red-dark: #cd2d3f;
  --c-red-darker: #ab2131;
  --c-divider-light-1: rgba(60, 60, 60, .29);
  --c-divider-light-2: rgba(60, 60, 60, .12);
  --c-divider-dark-1: rgba(84, 84, 84, .65);
  --c-divider-dark-2: rgba(84, 84, 84, .48);
  --c-green: #42b883; // vue
  --c-green-dark: #33a06f;
  --c-yellow: #ffcc00; // yandex
  --shadow-1: 0 1px 2px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .06);
  --shadow-2: 0 3px 12px rgba(0, 0, 0, .07), 0 1px 4px rgba(0, 0, 0, .07);
  --shadow-3: 0 12px 32px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .08);
  --shadow-4: 0 14px 44px rgba(0, 0, 0, .12), 0 3px 9px rgba(0, 0, 0, .12);
  --shadow-5: 0 18px 56px rgba(0, 0, 0, .16), 0 4px 12px rgba(0, 0, 0, .16);
  --info-max-width: 200px;
}

/* Light mode variables */
:root.light-theme {
  --text-1: var(--c-indigo);
  --text-2: rgba(60, 60, 60, .7);
  --text-3: rgba(60, 60, 60, .33);
  --text-4: rgba(60, 60, 60, .18);
  --text-code: var(--c-indigo-soft);

  --bg: var(--c-white);
  --bg-soft: var(--c-white-soft);
  --bg-mute: var(--c-white-mute);

  --c-gray-1: var(--c-gray-light-1);
  --c-gray-2: var(--c-gray-light-2);
  --c-gray-3: var(--c-gray-light-3);
  --c-gray-4: var(--c-gray-light-4);
  --c-gray-5: var(--c-gray-light-5);
  --c-divider-1: var(--c-divider-light-1);
  --c-divider-2: var(--c-divider-light-2);

  --c-text-1: var(--c-indigo);
  --c-text-2: rgba(60, 60, 60, .7);
  --c-text-3: rgba(60, 60, 60, .33);
  --c-text-4: rgba(60, 60, 60, .18);
  --c-text-code: var(--c-indigo-soft);

  --c-hover-svg: var(--c-indigo);
}

/* Dark mode variables */
:root.dark-theme {
  --text-1: rgba(255, 255, 255, .87);
  --text-2: rgba(235, 235, 235, .6);
  --text-3: rgba(235, 235, 235, .38);
  --text-4: rgba(235, 235, 235, .18);
  --text-code: var(--c-indigo-light);

  --bg: var(--c-black);
  --bg-soft: var(--c-black-soft);
  --bg-mute: var(--c-black-mute);

  --c-gray-1: var(--c-gray-dark-1);
  --c-gray-2: var(--c-gray-dark-2);
  --c-gray-3: var(--c-gray-dark-3);
  --c-gray-4: var(--c-gray-dark-4);
  --c-gray-5: var(--c-gray-dark-5);
  --c-divider-1: var(--c-divider-dark-1);
  --c-divider-2: var(--c-divider-dark-2);

  --c-text-1: rgba(255, 255, 255, .87);
  --c-text-2: rgba(235, 235, 235, .6);
  --c-text-3: rgba(235, 235, 235, .38);
  --c-text-4: rgba(235, 235, 235, .18);
  --c-text-code: var(--c-indigo-light);
  --c-hover-svg: var(--c-text-1);
}

.works__list {
  --max-width: 240px;
  @media (max-width: $tablets) {
    --max-width: 180px;
  }

  @media (max-width: $phones) {
    --max-width: 150px;
  }
}

@import "src/assets/styles/_variables.scss";

html {
  scroll-behavior: smooth;
}

.app__container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $bg;
  transition: background-color .5s;
  padding-top: $banner-height;
}

*, :before, :after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  width: 100%;
  min-width: $screen-min-width;
  min-height: 100vh;
  font-family: $font-family-base;
  letter-spacing: .2px;
  line-height: 24px;
  font-size: 16px;
  font-weight: 400;
  color: $text-1;
  background-color: $bg;
  direction: ltr;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  transition: color .5s, background-color .5s;
  -webkit-font-smoothing: antialiased;

  &.modal-open {
    overflow: hidden;
  }
}

button, input, optgroup, select, textarea {
  border: 0;
  padding: 0;
  line-height: inherit;
  color: inherit;
}

ul, ol {
  list-style: none;
}

a {
  color: inherit;
  text-decoration: inherit;
}

button, input, select, textarea {
  border: 0;
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  background-color: transparent;
}

a, area, button, [role=button], input, label, select, summary, textarea {
  touch-action: manipulation;
}

button {
  padding: 0;
  background-color: transparent;
  background-image: none;
}

button, [role=button] {
  cursor: pointer;
}

img, video {
  max-width: 100%;
  height: auto;
}

section {
  padding: 100px 32px;
  max-width: 960px;
  margin: 0 auto;

  @media (max-width: $tablets-big) {
    padding: 100px 32px;
  }

  @media (max-width: $tablets) {
    padding: 100px 32px;
  }

  @media (max-width: $phones) {
    padding: 100px 16px;
  }

  .skills__heading, .works__heading, .reviews__heading {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 1em;
    color: $text-1;
  }
}

.skills, .works, .reviews {
  padding: 64px 32px;

  @media (max-width: $phones) {
    padding: 100px 16px;
  }
}
</style>

