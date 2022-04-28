<template>
  <div class="appearance">
    <button
      class="switch"
      @click="toggleTheme"
    >
      <span class="switch__check">
        <span class="switch__icon">
          <element-svg
            file-name="sun"
            class="switch__sun"
          />
          <element-svg
            file-name="moon"
            class="switch__moon"
          />
        </span>
      </span>
    </button>
  </div>
</template>

<script setup lang='ts'>
import ElementSvg from '@/components/UI/ElementSvg/ElementSvg.vue'

import { useAppearance } from '@/hooks/useAppearance'

const { toggleTheme } = useAppearance()
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.appearance {
  display: flex;

  @media (max-width: $desktop) {
    display: none;
  }
}

.appearance--burger > .appearance {
  display: flex;
}

.navigation + .appearance {
  margin-left: 8px;
}

.menu__group .appearance {
  display: flex;
}

.switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid $divider-1;
  background-color: $bg-mute;
  transition: border-color .25s, background-color .25s;

  &:hover {
    border-color: $gray;
  }
}

.switch__check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: $white;
  box-shadow: var(--vt-shadow-1);
  transition: background-color .25s, transform .25s;
}

.switch__icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}

.switch__icon svg {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 12px;
  height: 12px;
  fill: $text-2;
}

.dark-theme .appearance .switch__check {
  transform: translate(18px);
}

.dark-theme .switch__check {
  background-color: $black;
}

.dark-theme .switch__icon svg {
  fill: $text-1;
  transition: opacity .25s;
}

.switch__sun, .dark-theme .switch__moon {
  opacity: 1;
}

.switch__moon, .dark-theme .switch__sun {
  opacity: 0;
}
</style>
