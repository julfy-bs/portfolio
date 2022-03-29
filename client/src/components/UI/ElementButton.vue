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
  padding: 30px 120px;
  border: none;
  border-radius: 40px 5px;
  background-image: linear-gradient(90deg,#9300e7,#4900ed);
  text-transform: uppercase;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  cursor: pointer;
}

.button:hover {
  background-image: linear-gradient(90deg,#b0f,#5900ff);
}

.button:focus {
  outline-color: $focus-color;
}
</style>
