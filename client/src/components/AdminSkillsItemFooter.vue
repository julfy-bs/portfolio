<template>
  <div class="skill__footer">
    <form class="skill__row">
      <div class="skill__name">
        <element-input
          input-placeholder="Новый навык"
          input-class="text"
          required
        />
      </div>
      <div class="skill__percent">
        <element-input
          input-type="number"
          input-placeholder="100"
          input-class="number"
          min="0"
          max="100"
          required
        />
      </div>
      <element-button
        type="submit"
        button-name="add"
        button-value="add"
      >
        <element-svg
          file-name="plus"
          class-name="icon icon--skill icon--add"
          :current-width="35"
          :current-height="35"
        />
      </element-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AdminSkillsItemFooter'
}
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.skill__footer {
  border-top: 1px solid #1f232d1a;
  margin: auto 0 0;
  padding: 10px 0 0 10%;
}

.skill__row {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  align-items: center;
}

.skill__name {
  margin-right: 10px;
}

.skill__percent {
  position: relative;
  margin-right: 10px;

  &::after {
    content: '%';
    display: block;
    position: absolute;
    right: 10px;
    bottom: 50%;
    font-weight: 700;
    font-size: 18px;
    color: $text-2;
    width: 10px;
    height: 10px;
    transform: translateY(-50%);
  }
}
</style>
