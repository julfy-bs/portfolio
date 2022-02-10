<template>
  <inline-svg
    :title="addTitle(fileName)"
    :src="require(`@/assets/icons/${checkFileName(fileName)}.svg`)"
    :width="currentWidth + 'px'"
    :height="currentHeight + 'px'"
    :fill="currentFill"
    class="icon"
    :class="`icon--${fileName}`"
  />
</template>

<script>
import InlineSvg from 'vue-inline-svg'

export default {
  name: 'ElementSvg',
  components: {
    InlineSvg
  },
  props: {
    fileName: {
      type: String,
      required: true
    },
    currentWidth: {
      type: Number,
      default: 30
    },
    currentHeight: {
      type: Number,
      default: 30
    },
    currentFill: {
      type: String,
      default: 'currentColor'
    }
  },
  methods: {
    checkFileName(str) {
      if (!str) return str
      return str.toLowerCase().slice()
    },
    addTitle(str) {
      if (!str) return str
      return str[0].toUpperCase() + str.slice(1)
    }
  }
}
</script>
