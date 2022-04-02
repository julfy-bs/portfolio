<template>
  <inline-svg
    :title="addTitle(fileName)"
    :src="require(`@/assets/icons/${checkFileName(fileName)}.svg`)"
    :fill="currentFill"
    :class="className"
    :width="currentWidth + 'px'"
    :height="currentHeight + 'px'"
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
    currentFill: {
      type: String,
      default: 'currentColor'
    },
    currentWidth: {
      type: Number,
      default: 10
    },
    currentHeight: {
      type: Number,
      default: 10
    },
    className: {
      type: String,
      default: ''
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
