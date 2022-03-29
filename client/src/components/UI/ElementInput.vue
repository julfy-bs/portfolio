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
