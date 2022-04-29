<template>
  <inline-svg
    :title="addTitle(fileName)"
    :src="require(`@/assets/icons/${checkFileName(fileName)}.svg`)"
    fill="currentColor"
  />
</template>

<script setup lang='ts'>
import { toRefs } from 'vue'
import InlineSvg from 'vue-inline-svg'

interface Props {
  fileName: string
}

const props = defineProps<Props>()

const { fileName } = toRefs(props)

const checkFileName = (str: string) => {
  if (!str) return str
  return str.toLowerCase().slice()
}
const addTitle = (str: string) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}
</script>
