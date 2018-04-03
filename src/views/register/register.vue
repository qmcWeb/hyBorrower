<template>
  <div id="register">
      <div class="main">
        <div class="account login_input_box">
          <input @blur="delete_active=false"  v-model="account" class="login_input" type="tel" maxlength="11" placeholder="手机号／用户名" @focus="errShow=false">
          <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
        </div>
        <div class="password login_input_box">
          <input ref="password" :value="password" @focus="errShow=false" v-model="password" class="login_input" :type="passwordType" placeholder="6至16位字母和数字组合">
          <span :class="{show_password: true, hide_password: passwordType === 'text'}" @click="showPassword"></span>
        </div>
        <div class="check_input login_input_box">
          <input ref="check_input"  v-model="checkNumCon" @focus="errShow=false" class="login_input" type="text" maxlength="4" placeholder="输入图形验证码">
          <span class="show_check_img" @click="getImgCode">
            <img :src="imgCode" alt="">
          </span>
        </div>
        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>注册</span>
        </div>
        <div class="control">
          注册借款账户代表您同意<a href="https://www.qianmancang.com/mobile/weChat_agreement" style="color: #3d3bee">《钱满仓网站服务协议》</a>
        </div>
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>
        <div class="footer" @click="$router.push('/login')">
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
          delete_active: false,
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
  created() {
    //监测每个输入框是否有值，点亮提交btn
    let _this=this;
    this.$watch(function () {
        return [_this.account,_this.password,_this.checkNumCon]
      }, this.commonJs.debounce((newVal, oldVal) => {
        let newArr=newVal;
        for(let i=0;i<newArr.length;i++){
          if(!newArr[i]){
            _this.activeBtn=false;
            return
          }
        }
        _this.activeBtn=true;
      })
    )
  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeRegisterUser'
    ]),
    clearTip(){
      this.errShow = false
    },
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
      if(this.activeBtn){
        this.$store.commit('changeLoading', true)
        this.$store.commit('changeRegisterUser', {
          mobile: this.account,
          password: this.password,
          captchamImg: this.checkNumCon
        })
        this.$http({
          method: 'post',
          url: this.api + '/app/platform/registOne',
          params: {
            mobileNum: this.account,
            password: this.password,
            captchaImg: this.checkNumCon
          },
          withCredentials: true
        }).then((data) => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.$router.push({path: '/infoCheck', query: {telNum: this.account}})
          }else{
            this.commonJs.toggle(this,data.data.message)
            this.$store.commit('changeLoading', false)
          }
        }).catch((err) => {
          this.$store.commit('changeLoading', false)
          this.errShow = true
          this.errMessage = '输入有误'
          console.log(err)
        })

      }
    },
    registerPort(){

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

      this.commonJs.getCommonImgCode(this)
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
