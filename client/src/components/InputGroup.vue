<template>
  <div class="input__group">
    <label
      class="input__label"
    >
      {{ labelTitle }}
    </label>
    <element-input
      :input-type="inputType"
      :input-placeholder="inputPlaceholder"
      :input-required="inputRequired"
      :class="`input--${inputClass}`"
    />
    <slot />
  </div>
</template>

<script>
import ElementInput from '@/mixins/UI/ElementInput'

export default {
  name: 'InputGroup',
  mixins: [ElementInput],
  props: {
    labelTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.input__group {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-bottom: 40px;
}

.input__label {
  font-weight: 600;
  margin-bottom: 10px;
  // todo: var
  color: $gray-svg;
  padding-left: 45px;
}
</style>
