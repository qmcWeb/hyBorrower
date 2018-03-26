<template>
  <div id="register">
      <div class="main">
        <div class="account login_input_box">
          <input @keyup='accountRight()' oninput="if(value.length>11)value=value.slice(0,11)" v-model="account" class="login_input" type="number" placeholder="手机号／用户名">
          <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
        </div>
        <div class="password login_input_box">
          <input @keyup="checkPassword" ref="password" :value="password" v-model="password" class="login_input" :type="passwordType" placeholder="6至16位字母和数字组合">
          <span class="show_password" @click="showPassword"></span>
        </div>
        <div class="check_input login_input_box">
          <input @keyup="checkNumMethod" ref="check_input"  v-model="checkNumCon" class="login_input" type="text" maxlength="4" placeholder="输入图形验证码">
          <span class="show_check_img" @click="getImgCode">
            <img :src="imgCode" alt="">
          </span>
        </div>
        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>注册</span>
        </div>
        <div class="control">
          注册借款账户代表您同意<span>《钱满仓网站服务协议》</span>
        </div>
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>
        <div class="footer" @click="$router.push('/hy/login')">
          已有账号?请登录
        </div>
      </div>
  </div>
</template>
<script>
// 引入vuex
import { mapActions } from 'vuex'
export default {
  name: 'register',
  data () {
      return {
          account: '',
          password: '',
          checkNumCon: '',
          delete_active: true,
          passwordType: 'password',
          errMessage: '手机号输入错误',
          errShow: false,
          checkPasswordBoolean: false,
          checkNum: false,
          activeBtn: false,
          imgCode: '',
          accountBoolean: false
      }
  },
  mounted(){
    this.getImgCode()
  },
  methods: {
    ...mapActions([
      'changeLoading'
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
      this.accountBoolean = this.commonJs.isPoneAvailable(this.account)
      if(this.checkNum&&this.checkPasswordBoolean&&this.accountBoolean){
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
      if(this.checkNum&&this.checkPasswordBoolean&&this.accountBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    loginMethod() {
      this.$router.push({path: '/infoCheck', query: {telNum: this.account}})
      if(this.activeBtn){
        this.$router.push('/infoCheck')
      }
    },
    registerPort(){
      this.$http.post(this.api + '/app /platform/registFirst', {
        params: {
          mobileNum: this.account,
          password: this.password
        }
      })
    },
    checkPassword() {
      this.checkPasswordBoolean = this.commonJs.passwordCheck(this.password)
      if(!this.checkPasswordBoolean){
        this.errShow = true
        this.errMessage = '密码长度为6至16位字母和数字组合'
      }else{
        this.errShow = false
      }
      if(this.checkNum&&this.checkPasswordBoolean&&this.accountBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    getImgCode(){
      this.$http.get(this.api + '/app/platform/getImgCodeUrl').then((data) => {
        if(data.data && data.data.code === '200'){
          this.$store.commit('changeLoading', false)
          this.imgCode = data.data.databody.imgCodeUrl + '?' + new Date()

        }
      })
    }
  },
  watch: {
    account: {
      handler: function(val, olderVal) {
        // 不要使用箭头函数
        if(val){
          this.delete_active = true

        }else{
          this.delete_active = false
          console.log(this.delete_active)
        }

      },
      deep: true
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './register.styl';
</style>
