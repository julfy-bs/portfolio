<template>
  <div class="skill__header">
    <div class="skill__name">
      <element-input
        input-placeholder="Название новой группы"
        input-required="true"
        input-class="text-with-svg"
      />
      <element-svg
        file-name="plus"
        class-name="icon icon--plus"
      />
    </div>
    <admin-skills-item-buttons
      :buttons="['tick', 'trash']"
      :width="25"
      :height="25"
    />
  </div>
</template>

<script>
import AdminSkillsItemButtons from '@/components/AdminSkillsItemButtons.vue'

export default {
  name: 'AdminSkillsItemHeader',
  components: {
    AdminSkillsItemButtons
  }
}
</script>

<style lang='scss' scoped>
.skill__header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #1f232d1a;
  margin-bottom: 30px;
}

.skill__name {
  position: relative;
  width: 400px;
}
</style>
