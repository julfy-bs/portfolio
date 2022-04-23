<template id="app">
  <div class="app__container">
    <router-view />
  </div>
</template>

<style lang='scss'>
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
  min-width: 320px;
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
    padding: 100px 64px;
  }

  @media (max-width: $tablets) {
    padding: 100px 32px;
  }

  @media (max-width: $phones) {
    padding: 100px 32px;
  }
}
</style>
