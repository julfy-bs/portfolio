<template>
  <element-navigation>
    <router-link
      v-for="link in navigationLinks"
      :key="link.id"
      :to="link?.to || '/'"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      {{ link.title }}
    </router-link>
    <a
      target="_blank"
      href="https://julfy.notion.site/Resume-565f39bdd17d404e9f1394f48fb01f66"
      class="navigation__link"
      :class="isBurgerActive ? 'navigation__link--burger-is-active' : ''"
      @click="closeBurger"
    >
      Resume
    </a>
    <element-navigation-group
      v-for="linksGroup in navigationGroups"
      :key="linksGroup.id"
      :links-group="linksGroup"
    />
  </element-navigation>
</template>

<script setup lang='ts'>
import ElementNavigation from '@/components/UI/ElementNavigation/ElementNavigation.vue'
import ElementNavigationGroup
  from '@/components/UI/ElementNavigationGroup/ElementNavigationGroup.vue'

import { computed, ref } from 'vue'
import { useBurger } from '@/hooks/useBurger'

const linksList = ref([
  {
    id: 0,
    title: 'Home',
    isGroup: false,
    to: '/'
  },
  {
    id: 1,
    title: 'Admin',
    isGroup: true,
    to: null,
    groupName: '',
    group: [
      { id: 0, title: 'Profile', to: '/admin/profile' },
      { id: 1, title: 'About', to: '/admin/about' },
      { id: 2, title: 'Skills', to: '/admin/skills' },
      { id: 3, title: 'Works', to: '/admin/works' },
      { id: 4, title: 'Reviews', to: '/admin/reviews' }
    ]
  }
])
const navigationLinks = computed(() => {
  return linksList.value.filter(item => !item.isGroup)
})

const navigationGroups = computed(() => {
  return linksList.value.filter(item => item.isGroup)
})
const { closeBurger, isBurgerActive } = useBurger()

</script>

<style scoped lang='scss'>
@import "src/assets/styles/_variables.scss";

</style>
