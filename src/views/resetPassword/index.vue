<template>
  <div id="resetPassword">
      <div class="main">
        <div class="top">
          <div class="container">
            <div class="step step_one" :class="{active_step1: showBoxNum >= 1,active_step2: showBoxNum >= 2}">
              <div class="step_top">1</div>
              <div class="step_bottom">手机号</div>
            </div>
            <div class="step step_two" :class="{active_step2: showBoxNum >= 2,active_step3: showBoxNum >= 3}">
              <div class="step_top">2</div>
              <div class="step_bottom">验证码</div>
            </div>
            <div class="step step_three" :class="{active_step3: showBoxNum >= 3}">
              <div class="step_top">3</div>
              <div class="step_bottom">重置密码</div>
            </div>
          </div>

        </div>
        <div v-if="showBoxNum === 1" class="first common">
          <div class="account login_input_box">
            <input v-on:blur='accountRight()' oninput="if(value.length>11)value=value.slice(0,11)" v-model="account" class="login_input" type="number" placeholder="手机号／用户名">
            <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
          </div>
          <div class="check_input login_input_box">
            <input maxlength="4" @keyup="checkNumMethod" ref="check_input"  v-model="checkNumCon" class="login_input" type="text" placeholder="输入图形验证码">
            <span class="show_check_img" @click="getImgCode">
              <img :src="imgCode" alt="">
            </span>
          </div>

        </div>

        <div v-if="showBoxNum === 2" class="second common">
          <div class="text_info">短信验证码已发送到{{ accountFilter }}</div>
          <div class="check_info_num login_input_box">
            <input maxlength="6" @keyup="checkInfoNumMethod"   v-model="checkInfoNum" class="login_input" type="text" placeholder="短信验证码">
            <span @click="getAgainCount" class="show_check_num">{{ countNum }}</span>
          </div>

        </div>

        <div v-if="showBoxNum === 3" class="third common">
          <div class="first_password login_input_box">
            <input maxlength="16" @keyup="firstPasswordMethod"   v-model="firstPassword" class="login_input" type="text" placeholder="重置账户密码">
          </div>
          <div class="second_password login_input_box">
            <input maxlength="16" @keyup="secondPasswordMethod"   v-model="secondPassword" class="login_input" type="text" placeholder="再次确认密码(6-16位字母和数字组合)">
          </div>

        </div>


        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>{{ btnInfo }}</span>
        </div>
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>

      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'resetPassword',
  data () {
      return {
          account: '13567567675',
          checkNumCon: '',
          delete_active: true,
          errMessage: '手机号输入错误',
          errShow: false,
          checkNum: false,
          activeBtn: false,
          showBoxNum: 1,
          btnInfo: '下一步',
          countNum: '60s',
          checkInfoNum: '',
          accountFilter: '',
          firstPasswordBoolean: false,
          secondPasswordBoolean: false,
          firstPassword: '',
          secondPassword: '',
          imgCode: ''
      }
  },
  mounted(){
    this.accountRight()
    this.getImgCode()
  },
  methods: {
    ...mapActions([
      'changeLoading',
    ]),
    showPassword() {
      if(this.passwordType === 'password'){
        this.passwordType = 'text'
      }else{
        this.passwordType = 'password'
      }
    },
    hideDelete() {
      this.delete_active = false
      this.account = ''
    },
    accountRight() {
      this.errShow = !this.commonJs.isPoneAvailable(this.account)
      this.errMessage = '手机号输入错误'
      if(this.checkNum && !this.errShow){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    checkNumMethod() {
      if(this.checkNumCon.length === 4){
        this.checkNum = true
        this.errShow = false
      }else{
        this.checkNum = false
        this.errShow = true
        this.errMessage = '验证码不正确'
      }
      if(this.checkNum && !this.errShow){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    loginMethod() {
      if(this.showBoxNum === 1 && this.activeBtn === true){
        this.showBoxNum++
        var str = this.account.substring(3,7)
        this.accountFilter = this.account.replace(str, '****')
        this.activeBtn = false
      }else if(this.activeBtn && this.showBoxNum === 2){
        this.showBoxNum++
        this.btnInfo = '重置密码'
        this.activeBtn = false
      } else if(this.activeBtn && this.showBoxNum === 3){
        this.$router.push('/accountCenter')
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
    checkInfoNumMethod() {
      if(this.checkInfoNum.length === 6){
        this.checkNum = true
        this.errShow = false
      }else{
        this.checkNum = false
        this.errShow = true
        this.errMessage = '短信验证码不正确'
      }
      if(this.checkNum){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    firstPasswordMethod() {
      this.firstPasswordBoolean = this.commonJs.passwordCheck(this.firstPassword)
      if(!this.firstPasswordBoolean){
        this.errShow = true
        this.errMessage = '密码格式不正确'
      }else{
        this.errShow = false
      }
      if(this.secondPasswordBoolean && this.firstPasswordBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    secondPasswordMethod() {
      if(this.firstPassword === this.secondPassword){
        this.errShow = false
        this.secondPasswordBoolean = true
      }else{
        this.errShow = true
        this.secondPasswordBoolean = false
        this.errMessage = '两次输入密码不一致'
      }

      if(this.secondPasswordBoolean && this.firstPasswordBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    getImgCode(){
      
      this.$http({
        method: 'get',
        url: this.api + '/verifyCodeServlet', 
        withCredentials: true,
        responseType: 'arraybuffer',
        proxy: {
          host: 'http://218.247.190.158',
          port: 17774
        }
      }).then(response => {
        return 'data:image/png;base64,' + btoa(
        new Uint8Array(response.data)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
      }).then((data) => {
        console.log(data)
        this.imgCode = data
        //this.$store.commit('changeLoading', false)
      }).catch((response) => {
        //this.$store.commit('changeLoading', false)
      })
    }
  },
  watch: {
    showBoxNum: {
      handler: function(val, olderVal) {
        // 不要使用箭头函数
        if(val === 2){
          this.getCountDown()

        }

      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './resetPassword.styl';
</style>
