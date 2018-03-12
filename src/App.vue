<template>
  <div id="app">
    <div v-wechat-title='$route.meta.title'></div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" scoped>
@import "./assets/css/reset.css";
</style>

