<template>
  <section
    id="works"
    class="works"
  >
    <h2 class="works__heading">
      My Works
    </h2>
    <div class="works__list">
      <div class="works__item">
        <picture>
          <source
            srcset="@/static/images/among-us.png"
            type="image/png"
          >
          <img
            src="@/static/images/among-us.png"
            alt="user"
            class="works__image"
          >
        </picture>
      </div>
      <div class="works__item">
        <picture>
          <source
            srcset="@/static/images/among-us.png"
            type="image/png"
          >
          <img
            src="@/static/images/among-us.png"
            alt="user"
            class="works__image"
          >
        </picture>
      </div>
      <div class="works__item">
        <picture>
          <source
            srcset="@/static/images/among-us.png"
            type="image/png"
          >
          <img
            src="@/static/images/among-us.png"
            alt="user"
            class="works__image"
          >
        </picture>
      </div>
      <div class="works__item">
        <picture>
          <source
            srcset="@/static/images/among-us.png"
            type="image/png"
          >
          <img
            src="@/static/images/among-us.png"
            alt="user"
            class="works__image"
          >
        </picture>
      </div>
      <div class="works__item">
        <picture>
          <source
            srcset="@/static/images/among-us.png"
            type="image/png"
          >
          <img
            src="@/static/images/among-us.png"
            alt="user"
            class="works__image"
          >
        </picture>
      </div>
    </div>
  </section>
</template>

<script setup lang='ts'>
</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

.works {

}

.works__heading {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 1em;
  color: $text-1;
}

.works__list {
  --max-width: 240px;

  @media (max-width: $tablets) {
    --max-width: 180px;
  }

  @media (max-width: $phones) {
    --max-width: 150px;
  }
}


.works__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--max-width), 1fr));
  column-gap: 4px;
}

.works__item {
  background-color: $bg-soft;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(var(--max-width) / 2 - 6px);
  margin: 2px 0;
  border-radius: 3px;
  transition: background-color 0.2s ease 0s;

  &:hover {
    background-color: $bg-mute;
  }
}

.dark-theme .works__item {
  &:hover {
    .works__image {
      filter: none;
    }
  }
}

.dark-theme .works__image {
  filter: grayscale(1) invert(1);
}

.works__image {
  max-width: calc(var(--max-width) - 30px);
  max-height: calc(var(--max-width) / 2 - 20px);
}
</style>
