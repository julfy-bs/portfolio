<template>
  <div class="socials">
    <a
      href="https://github.com/julfy-bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="telegram"
        class-name="social__icon"
      />
    </a>
    <a
      href="https://github.com/julfy-bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="github"
        class-name="social__icon"
      />
    </a>
    <a
      href="https://t.me/julfy_bs"
      class="socials__link socials__link--is-small"
      target="_blank"
    >
      <element-svg
        file-name="discord"
        class-name="social__icon"
      />
    </a>
  </div>
</template>

<script>
import elementSvg from '@/components/UI/ElementSvg/ElementSvg'

export default {
  name: 'MainSocials',
  components: {
    elementSvg
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.socials {
  display: none;
  margin-right: -10px;
  margin-left: 12px;

  @media (min-width: $bp-desktop) {
    display: flex;
  }
}

.socials__link {
  display: flex;
  align-items: center;
  justify-content: center;
  color: $text-default-color;
  transition: fill .2s ease, stroke .2s ease;

  &--is-small {
    width: 36px;
    height: 36px;
  }

  &:hover {
    cursor: pointer;
    color: $hover-color
  }
}

.social__icon {
  fill: currentColor;
  width: 20px;
  height: 20px;
}
</style>
