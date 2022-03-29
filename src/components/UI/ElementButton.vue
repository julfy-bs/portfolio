<template>
  <button
    :type="buttonType"
    :name="buttonName"
    :value="buttonValue"
    class="button"
    :class="`button--${buttonClass}`"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'ElementButton',
  props: {
    buttonName: {
      type: String,
      required: true
    },
    buttonValue: {
      type: String,
      required: true
    },
    buttonType: {
      type: String,
      default: 'button'
    },
    buttonClass: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
.button {
  cursor: pointer;
  border: none;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  &--svg {
    padding: 5px;
  }

  &--gradient {
    padding: 30px 120px;
    border-radius: 40px 5px;
    background-image: linear-gradient(90deg,#9300e7,#4900ed);
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 700;
    color: #fff;

    &:hover {
      background-image: linear-gradient(90deg,#b0f,#5900ff);
    }
  }

  :focus {
    outline-color: $focus-color;
  }
}
</style>
