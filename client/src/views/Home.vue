<template>
  <HomeHeader />
  <main id="main">
    <section id="hero">
      <h1 class="hero-title">
        Личный сайт
        <br>
        <span class="gradient">
          Frontend
        </span>
        разработчика
      </h1>
    </section>
  </main>
</template>
<script>
import HomeHeader from '@/components/HomeHeader/HomeHeader.vue'

export default {
  name: 'HomePage',
  components: {
    HomeHeader
  }

}
</script>

<style lang='scss' scoped>

#main {
  padding-top: main-padding-top(40);
}
</style>
