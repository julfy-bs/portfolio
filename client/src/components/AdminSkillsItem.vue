<template>
  <div class="skills__item skill">
    <admin-skills-item-header />
    <div class="skill__body">
      ass
    </div>
    <admin-skills-item-footer />
  </div>
</template>

<script>
import AdminSkillsItemHeader from '@/components/AdminSkillsItemHeader.vue'
import AdminSkillsItemFooter from '@/components/AdminSkillsItemFooter.vue'

export default {
  name: 'AdminSkillsItem',
  components: {
    AdminSkillsItemHeader, AdminSkillsItemFooter
  }
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skill {
  width: 50%;
  min-height: 400px;
  padding: 30px 20px;
  // todo: color
  //background: $white;
  border-radius: 14px;
  box-shadow: 10px 10px 5px rgba(45, 60, 78, .3);
  display: flex;
  flex-flow: column nowrap;
}

.skill__body {
  height: 100%;
}
</style>
