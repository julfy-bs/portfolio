import { onBeforeUnmount, onMounted, ref } from 'vue'
// import router from '@/router'

export const useIntersectionObserver = (selectorsAll: string) => {
  const sectionObserver = ref<IntersectionObserver | null>(null)

  try {
    // options
    const options = {
      rootMargin: '0px 0px -500px 0px'
    }
    // callback
    const callback: IntersectionObserverCallback = (entries) => entries.forEach((el) => {
      if (el.isIntersecting) {
        const sectionId = el.target.id
        // void router.replace({ hash: `#${sectionId}` })
        history.pushState({}, '', `#${sectionId}`)
      }
    })
    // IntersectionObserver
    sectionObserver.value = new IntersectionObserver(callback, options)
    // Watch elements
    const elementsArray = document.querySelectorAll(selectorsAll)
    elementsArray.forEach((el) => sectionObserver.value?.observe(el))
  } catch (e) {
    throw new Error(e)
  }

  onMounted(() => useIntersectionObserver(selectorsAll))
  onBeforeUnmount(() => sectionObserver.value?.disconnect())

  return {
    sectionObserver
  }
}
