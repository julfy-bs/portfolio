<template>
  <ul class="skill__buttons-list">
    <li
      v-if="buttons.includes('tick')"
      class="skill__buttons-item"
    >
      <element-button
        button-name="save"
        button-value="save"
      >
        <element-svg
          file-name="tick"
          class-name="icon icon--skill icon--save"
          :current-width="width"
          :current-height="height"
        />
      </element-button>
    </li>
    <li
      v-if="buttons.includes('trash')"
      class="skill__buttons-item"
    >
      <element-button
        button-name="remove"
        button-value="remove"
      >
        <element-svg
          file-name="trash"
          class-name="icon icon--skill icon--remove"
          :current-width="width"
          :current-height="height"
        />
      </element-button>
    </li>
    <li
      v-if="buttons.includes('edit')"
      class="skill__buttons-item"
    >
      <element-button
        button-name="edit"
        button-value="edit"
      >
        <element-svg
          file-name="edit"
          class-name="icon icon--skill icon--edit"
          :current-width="width"
          :current-height="height"
        />
      </element-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'AdminSkillsItemButtons',
  components: {},

  props: {
    buttons: {
      type: Array,
      default: () => [],
      required: true
    },
    width: {
      type: Number,
      default: 20
    },
    height: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style lang='scss' scoped>
.skill__buttons-list {
  display: flex;
  flex-flow: row nowrap;
  list-style: none;
}

.skill__buttons-item {
  margin-right: 20px;

  &:last-child {
    margin: 0;
  }
}
</style>
