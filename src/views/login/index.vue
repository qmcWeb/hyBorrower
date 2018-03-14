<template>
  <div id="login">
      <div class="main">
        <div class="account login_input_box">
          <input v-on:blur='accountRight()' oninput="if(value.length>11)value=value.slice(0,11)" v-model="account" class="login_input" type="number" placeholder="手机号／用户名">
          <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
        </div>
        <div class="password login_input_box">
          <input @keyup="checkNumMethod" ref="password" :value="password" v-model="password" class="login_input" :type="passwordType" placeholder="请输入密码">
          <span class="show_password" @click="showPassword"></span>
        </div>
        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>同意协议并登录</span>
        </div>
        <div class="control">
          <div class="register" @click="$router.push('/hy/register')">
            注册
          </div>
          <div class="reset_password" @click="$router.push('/hy/resetPassword')">
            忘记密码?
          </div>
        </div>
        <div v-if="errShow" class="err_message">
          {{ errMessage }}
        </div>
        <div class="footer" @click="$router.push('/hy/login')">
          《钱满仓网站服务协议》
        </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
      return {
          account: '1',
          password: '',
          delete_active: true,
          passwordType: 'password',
          errMessage: '手机号输入错误',
          errShow: false,
          checkNum: false,
          activeBtn: false
      }
  },
  mounted(){
    this.accountRight()
  },
  methods: {
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
    },
    checkNumMethod() {
      this.checkNum = this.commonJs.passwordCheck(this.password)
      
      if(this.checkNum && !this.errShow){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    loginMethod() {
      if(this.checkNum && !this.errShow){
        this.$router.push('/hy/accountCenter')
      }
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
@import './login.stylus';
</style>
