<template>
  <div id="app" v-loading.fullscreen.lock='loading'>
    <div v-wechat-title='$route.meta.title'></div>
    <router-view/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import LStorage from './assets/js/LStorage'
export default {
  name: 'App',
  created:function () {
      let userInfo=LStorage.getItem('userInfo');
      if(userInfo){
        this.$router.push({path: '/accountCenter'});
      }else{
          alert(222)
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

