<template>
  <div class="description">
    <div class="description__header">
      <div class="description__intro">
        Hi, my name is
      </div>
      <div class="description__name">
        {{ user.name }} {{ user.surname }}
      </div>
    </div>
    <div class="description__body">
      <div
        v-for="line in lines"
        :key="line"
        class="description__block"
      >
        {{ line }}
      </div>
      <div class="description__block">
        <element-button-link
          :link="user.resume"
        >
          CV
        </element-button-link>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import ElementButtonLink from '@/components/UI/ElementButtonLink/ElementButtonLink.vue'
import { useUser } from '@/hooks/useUser'

const { user } = useUser()

const lines = user.value.description.split('\n')
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.description {
  display: flex;
  flex-flow: column nowrap;
  gap: 10px;
  background-color: transparent;
  transition: color .5s, background-color .5s;
  border-radius: 8px;
  flex-grow: 1;
  font-size: 14px;
  font-weight: 500;

  .description__header, .description__body {
    display: flex;
    flex-flow: column nowrap;
  }

  .description__header {
    gap: 10px;

    .description__intro {
      text-align: center;

      @media (min-width: $tablets-big) {
        text-align: left;
      }
    }

    .description__name {
      color: $text-1;
      font-size: 36px;
      font-weight: 700;
      line-height: 1.1;
      text-align: center;

      @media (min-width: $tablets-big) {
        text-align: left;
      }
    }
  }

  .description__body {
    gap: 24px;
  }

  .description__codewars-badge {
    transition: color .5s, background-color .5s, fill .5s, outline-color .5s;
  }

  .description__block {
    text-align: center;

    @media (min-width: $tablets) {
      text-align: left;
    }
  }
}
</style>
