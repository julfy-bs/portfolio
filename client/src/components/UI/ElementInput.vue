<template>
  <input
    class="input"
    :class="`input--${inputClass}`"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :required="inputRequired"
  >
</template>

<script>
import ElementInput from '@/mixins/UI/ElementInput'

export default {
  name: 'ElementInput',
  mixins: [ElementInput]
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.input {
  background: transparent;
  border: 0 solid transparent;
  min-height: 40px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 18px;
  color: $text-2;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(to left, transparent 15%, black 15%, black 85%, transparent 85%) 20;

  &--text {
    width: 100%;
    padding: 10px;
    border-image: linear-gradient(to left, transparent 10%, black 10%, black 90%, transparent 90%) 20;
  }

  &--text-with-svg {
    position: relative;
    width: 100%;
    padding: 10px 45px;
  }

  &--number {
    width: 80px;
    padding: 10px 20px 10px 10px;
    border-image: linear-gradient(to left, transparent 38%, black 38%, black 70%, transparent 70%) 20;
  }
}

.input::placeholder {
  opacity: .3;
}

.input:focus {
  -webkit-focus-ring-color: $focus-color;
  outline-color: $focus-color;
}

</style>
