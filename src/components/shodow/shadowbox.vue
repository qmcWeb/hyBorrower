<template>
  <div id="shadowBox">
      <div class="main">
          <div class="content">
              <h3>退出登录</h3>
              <div class="text">
                  确认退出当前登录账号？
              </div>
              <div class="btn_box">
                  <div class="left btn" @click="closeBox">
                      取消
                  </div>
                  <div class="right btn" @click="goLogin">
                      确认
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'shadowBox',
  data () {
      return {
          
      }
  },
  methods: {
      closeBox(){
          this.$emit('setOutShow', false)
      },
      goLogin(){
          this.$emit('setOutSure')
      }
  }
}
</script>
<style lang="stylus" scoped>
@import './shadowbox.styl';
</style>
