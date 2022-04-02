<template>
  <HomeHeader />
  <main id="main">
    <div class="container">
      <h1>home page</h1>
    </div>
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
  padding-top: 200vh;
}
</style>
