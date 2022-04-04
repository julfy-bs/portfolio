<template>
  <button
    class="hamburger"
    :class="isActive ? 'hamburger--is-active' : ''"
    @click="toggleBurger"
  >
    <span class="hamburger__container">
      <span class="hamburger__top" />
      <span class="hamburger__middle" />
      <span class="hamburger__bottom" />
    </span>
  </button>
</template>

<script>
export default {
  name: 'MainBurger',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    toggleBurger: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.hamburger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: $header-height;

  @media (min-width: $tablets) {
    display: none;
  }
}

.hamburger__container {
  position: relative;
  width: 16px;
  height: 14px;
  overflow: hidden;
}

.hamburger__top, .hamburger__middle, .hamburger__bottom {
  position: absolute;
  width: 16px;
  height: 2px;
  background-color: $text-1;
  transition: top .25s, background-color .5s, transform .25s;
}

.hamburger__top {
  top: 0;
  left: 0;
  transform: translate(0);
}

.hamburger__middle {
  top: 6px;
  left: 0;
  transform: translate(8px);
}

.hamburger__bottom {
  top: 12px;
  left: 0;
  transform: translate(4px);
}

.hamburger:hover .hamburger__top {
  transform: translate(4px);
}

.hamburger:hover .hamburger__middle {
  transform: translate(0);
}

.hamburger:hover .hamburger__bottom {
  transform: translate(8px);
}

.hamburger.hamburger--is-active .hamburger__top {
  top: 6px;
  transform: translate(0) rotate(225deg);
}

.hamburger.hamburger--is-active .hamburger__middle {
  top: 6px;
  transform: translate(16px);
}

.hamburger.hamburger--is-active .hamburger__bottom {
  top: 6px;
  transform: translate(0) rotate(135deg);
}
</style>
