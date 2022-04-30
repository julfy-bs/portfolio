<template>
  <inline-svg
    :title="addTitle(props.fileName)"
    :src="require(`@/assets/icons/${checkFileName(props.fileName)}.svg`)"
    fill="currentColor"
  />
  <!--  :src="require(`@/assets/icons/${checkFileName(fileName)}.svg`)"-->
</template>

<script setup lang='ts'>
import InlineSvg from 'vue-inline-svg'

interface Props {
  fileName: string
}

const props = defineProps<Props>()


const checkFileName = (str: string) => {
  if (!str) return str
  return str.toLowerCase().slice()
}
const addTitle = (str: string) => {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}
</script>
