<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  created () {
    this.$store.dispatch('getPosts')
    // if(this.$store.state.token !== ''){
    this.$store.dispatch('getUserId')
    // }
  }
}
</script>

<style scoped>
</style>
