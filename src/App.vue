<template>
  <div id="app" v-loading='loading'>
    <!-- <div v-wechat-title='$route.meta.title'></div> -->
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'App',
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>

<style lang="stylus" scoped>
  #app
    height: 100%;
    width: 100%;
</style>

