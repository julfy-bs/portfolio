<template>
  <element-title>
    Блок «Обо мне»
  </element-title>
  <admin-skills-group />
</template>

<script>
import AdminSkillsGroup from '@/components/AdminSkillsGroup.vue'

export default {
  name: 'AdminAbout',
  components: { AdminSkillsGroup }
}
</script>

<style lang='scss' scoped>

</style>
