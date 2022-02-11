<template>
  <input
    class="input"
    :type="inputType"
    :placeholder="inputPlaceholder"
    :required="inputRequired"
  >
</template>

<script>
export default {
  name: 'ElementInput',
  props: {
    inputType: {
      type: String,
      default: 'text'
    },
    inputPlaceholder: {
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
.input {
  padding: 10px 45px;
  min-height: 40px;
  background-color: transparent;
  opacity: 1;
  font-weight: 700;
  font-size: 18px;
  color: $gray;
  border: none;
  border-radius: 12px;
  position: relative;
  outline-color: blue;
  transition: outline .4s ease;
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(to left, transparent 15%, black 15%, black 85%, transparent 85%) 20;
}

.input::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  border-top: 1px solid #000;
  content: "";
}

.input::placeholder {
  opacity: .3;
}

.input:focus {
  outline-color: $focus-color;
}
</style>
