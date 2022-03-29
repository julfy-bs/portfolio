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
    />
    <slot />
  </div>
</template>

<script>
export default {
  name: 'InputGroup',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    inputPlaceholder: {
      type: String,
      required: true
    },
    labelTitle: {
      type: String,
      required: true
    },
    inputRequired: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang='scss' scoped>
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
  color: $gray-svg;
  padding-left: 45px;
}
</style>
