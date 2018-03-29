<template>
  <div id="login">
      <div class="main">
        <div class="account login_input_box">
          <input oninput="if(value.length>11)value=value.slice(0,11)"  v-model="account"  class="login_input" type="number" placeholder="手机号／用户名">
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
          <div class="register" @click="$router.push('/register')">
            注册
          </div>
          <div class="reset_password" @click="$router.push('/resetPassword')">
            忘记密码?
          </div>
        </div>
        <div v-if="errShow" class="err_message">
          {{ errMessage }}
        </div>
        <span class="footer">
                 <a  href="https://www.qianmancang.com/mobile/weChat_agreement">
          《钱满仓网站服务协议》
        </a>
        </span>

      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'login',
  data () {
      return {
          account: '',
          password: '',
          delete_active: true,
          passwordType: 'password',
          errMessage: '手机号输入错误',
          errShow: false,
          checkNum: false,
          activeBtn: false
      }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  created() {
    this.$watch('account', this.commonJs.debounce(() => {
      this.accountRight()
    }, 1000))
  },
  mounted(){
    this.$store.commit('changeLoading', false)
  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeUser'
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
    test(){
      console.log('222')
    },
    accountRight() {
      

      this.errShow = !this.commonJs.isPoneAvailable(this.account)
      this.accountBoolean = this.commonJs.isPoneAvailable(this.account)
      if(this.checkNum && this.accountBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    checkNumMethod() {
      this.checkNum = this.commonJs.passwordCheck(this.password)

      if(this.checkNum && this.accountBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    loginMethod() {

      if(this.activeBtn){
        this.$store.commit('changeLoading', true)
        this.$http({
          method: 'post',
          url: this.api + '/app/platform/loginLoaner',
          params: {
            loginName: this.account,
            password: this.password,
            source: 'huiyin'
          }
        }).then((data) => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.$store.commit('changeUser', data.data.dataBody)
            this.$router.push('/accountCenter')
          }else{
            this.errShow = true
            this.errMessage = data.data.message
            this.$store.commit('changeLoading', false)
          }
        }).catch((err) => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })
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
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import 'login.styl';
</style>
