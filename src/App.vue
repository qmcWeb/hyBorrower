<template>
  <div id="app">
    <div v-wechat-title='$route.meta.title'></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created:function () {
  }
}
</script>

<style lang="stylus" scoped>
  #app
    height: 100%;
    width: 100%;
</style>

