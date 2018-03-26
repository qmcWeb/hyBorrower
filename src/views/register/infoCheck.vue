<template>
  <div id="infoCheck">
      <div class="main">
        <div class="top">
          <div class="left">
            短信验证码已发送到
          </div>
          <div class="center">
            {{ telphoneNum }}
          </div>
        </div>
        <div class="check_input login_input_box">
          <input maxlength="6" @keyup="checkNumMethod" ref="check_input"  v-model="checkNumCon" class="login_input" type="text" placeholder="短信验证码">
          <span @click="getAgainCount" class="show_check_num">{{ countNum }}</span>
        </div>
        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>完成</span>
        </div>
        
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>
        
      </div>
  </div>
</template>
<script>
export default {
  name: 'infoCheck',
  data () {
      return {
          telphoneNum: '185****0000',
          checkNumCon: '',
          errMessage: '手机号输入错误',
          errShow: false,
          checkNum: false,
          activeBtn: false,
          countNum: '60s'
      }
  },
  mounted(){
    this.getCountDown()
    this.getInfo()
  },
  methods: {
   
    checkNumMethod() {
      if(this.checkNumCon.length === 6){
        this.checkNum = true
        this.errShow = false
      }else{
        this.checkNum = false
        this.errShow = true
        this.errMessage = '验证码不正确'
      }
      if(this.checkNum){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    loginMethod() {
      this.$router.push('/hy/openAccount')
      if(this.checkNum && !this.errShow&&this.checkPasswordBoolean){
        this.$router.push('/hy/openAccount')
      }
    },
    getCountDown() {
      var that = this
      this.commonJs.countDown({
        func: function(){
          if(this.count > 0){
            that.countNum = this.count + 's'
          }else{
            that.countNum = '重新获取'
          }
        },
        count: 60,
        delay: 1000
      })
    },
    getAgainCount() {
      if(this.countNum === '重新获取'){
        this.getCountDown()
      }
    },
    getInfo() {
      console.log(this.$route.query.telNum)
      var str = this.$route.query.telNum.substring(3,7)
      console.log(str)
      this.telphoneNum = this.$route.query.telNum.replace(str, '****')
    }
    
  }
}
</script>
<style lang="stylus" scoped>
@import './infoCheck.styl';
</style>
