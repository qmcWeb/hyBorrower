<template>
  <div id="app" v-loading.fullscreen='loading'>
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

</style>

