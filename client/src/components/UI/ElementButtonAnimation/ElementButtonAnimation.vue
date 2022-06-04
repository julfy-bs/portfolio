<template>
  <div class="animation-button">
    <button>
      <span>
        <slot />
      </span>
    </button>
  </div>
</template>

<script setup lang='ts'>
import { toRefs } from 'vue'

type RoleType = 'edit' | 'save' | 'delete'

interface Props {
  role: RoleType;
}

const props = defineProps<Props>()

const { role = 'save' } = toRefs(props)
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.animation-button {
  position: relative;
  min-width: 160px;
  height: 36px;
}

.animation-button button {
  font-weight: 400;
  min-width: 100%;
  height: 100%;
  border-width: 0;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  letter-spacing: .4px;
  color: #444858;;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform: translateZ(0);

  &::before {
    left: 50%;
    top: 50%;
    width: 200%;
    padding-top: 200%;
    transform-origin: center;
    transform: translate(-50%, -50%) rotate(-45deg);
    background-color: $brand-vue;
    background-image: $vue-gradient;
    background-size: 200% 200%;
    opacity: 1;
    animation: animation_btn_idle 15s ease-in-out infinite;
  }

  span {
    z-index: 1;
    position: relative;
    color: #ffffff;
    text-shadow: 0 -1px 1px rgb(0 0 0 / 25%);
  }

  &:after {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    background-image: linear-gradient(45deg,transparent,transparent 25%,rgba(0,231,255,.7) 45%,rgba(255,0,231,.7) 55%,transparent 70%,transparent),url(https://static.wasd.tv/assets/fe/images/buttons/button-donate-fx.gif);
    background-size: 200% 200%,cover;
    mix-blend-mode: screen;
    opacity: 0;
    transition: opacity .3s ease-out;
  }
}

.animation-button button:after, .animation-button button:before {
  content: "";
  position: absolute;
}

.animation-button button:hover:after {
  opacity: 1;
}

@keyframes animation_btn_idle {
  0% {
    background-position: 0 0
  }
  to {
    background-position: -200% -200%
  }
}
</style>
