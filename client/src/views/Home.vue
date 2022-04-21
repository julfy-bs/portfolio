<template>
  <HomeHeader />
  <main
    class="main"
  >
    <home-hero />
    <home-about />
    <home-skills />
  </main>
</template>

<script lang='ts'>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'
import HomeHero from '@/components/HomeHero/HomeHero.vue'
import HomeAbout from '@/components/HomeAbout/HomeAbout.vue'
import HomeSkills from '@/components/HomeSkills/HomeSkills.vue'
import { defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'Home',
  components: {
    HomeHeader,
    HomeHero,
    HomeAbout,
    HomeSkills
  },
  setup() {
    const sectionObserver = ref<IntersectionObserver | null>(null)
    const router = useRouter()

    const observeSections = () => {
      const options = {
        rootMargin: '0px 0px -500px 0px'
      }

      const callback: IntersectionObserverCallback = (entries) => entries.forEach((el) => {
        if (el.isIntersecting) {
          const sectionId = el.target.id
          history.pushState({}, '', `#${sectionId}`)
        }
      })

      sectionObserver.value = new IntersectionObserver(callback, options)

      const elementsArray = document.querySelectorAll('section')
      elementsArray.forEach((el) => sectionObserver.value?.observe(el))
    }

    onMounted(() => {
      observeSections()
    })

    onBeforeUnmount(() => {
      sectionObserver.value?.disconnect()
    })
  }
})
</script>

<style lang='scss' scoped>
@import "src/assets/styles/_variables.scss";

.main {
  position: relative;
}

</style>
