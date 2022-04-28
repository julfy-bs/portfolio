<template>
  <div class="flyout extra">
    <button
      class="extra__button"
      aria-expanded="false"
    >
      <element-svg
        file-name="detail"
        class="extra__icon"
      />
    </button>
    <div class="flyout__menu">
      <div class="menu">
        <div class="menu__group">
          <p class="menu__label">
            Сменить тему
          </p>
          <change-appearance />
        </div>
        <div class="menu__group">
          <main-socials />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue'
import ChangeAppearance from '@/components/MainAppearance/ChangeAppearance.vue'
import MainSocials from '@/components/MainSocials/MainSocials.vue'
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.extra {
  display: none;
  @media (min-width: $tablets) {
    display: block;
  }

  @media (min-width: $desktop) {
    display: none;
  }
}

.extra__button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: $header-height;
  transition: color .5s;
}

.extra__icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill .25s;
}

.flyout {
  position: relative;

  &:hover {
    color: var(--vt-c-bland);
    transition: color .25s;
  }
}

.flyout:hover {
  color: $text-3;
  transition: color .25s;
}

.flyout__menu {
  position: absolute;
  top: calc(#{$header-height} / 2 + 15px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity .25s, visibility .25s, transform .25s;
}

.menu {
  border-radius: 8px;
  padding: 12px 0;
  min-width: 192px;
  border: 1px solid transparent;
  background: $bg;
  box-shadow: $shadow-3;
  transition: background-color .5s;
}

.flyout:hover .flyout__menu, .extra__button[aria-expanded=true] + .flyout__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.menu .menu__group {
  padding: 0 16px 12px;
  white-space: nowrap;
}

.menu__group {
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu__label {
  flex-grow: 1;
  line-height: 28px;
  font-size: 12px;
  font-weight: 500;
  color: $text-2;
  transition: color .5s;
}

.menu .menu__group:last-child {
  padding-bottom: 0;
}

.menu .menu__group + .menu__group {
  border-top: 1px solid $divider-1;
  padding: 11px 16px 0;
}
</style>
