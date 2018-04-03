<template>
  <div id="login">
      <div class="main">
        <div class="account login_input_box">
          <input @blur="delete_active=false"  v-model="account"  class="login_input" type="tel" placeholder="手机号／用户名" maxlength="11"  @focus="clearTip">
          <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
        </div>
        <div class="password login_input_box">
          <input ref="password" :value="password"  v-model="password" class="login_input" :type="passwordType" placeholder="请输入密码" @focus="clearTip">
          <span :class="{show_password: true, hide_password: passwordType === 'text'}" @click="showPassword">
            
          </span>
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
          delete_active: false,
          passwordType: 'password',
          errMessage: '手机号输入错误',
          errShow: false,
          checkNum: false,
          activeBtn: false,
      }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  created() {
    //监测每个输入框是否有值，点亮提交btn
    let _this=this;
    this.$watch(function () {
      return [_this.account,_this.password]
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
  mounted(){
    this.$store.commit('changeLoading', false)
  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeUser'
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
    test(){
      console.log('222')
    },
    accountRight() {
      this.errMessage='手机号码错误';
      this.errShow = !this.commonJs.isPoneAvailable(this.account)
      this.accountBoolean = this.commonJs.isPoneAvailable(this.account)
      if(this.checkNum && this.accountBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    checkNumMethod() {
      this.errShow = !this.commonJs.passwordCheck(this.password);
      this.errMessage='密码格式错误';
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
            this.commonJs.toggle(this,data.data.message)
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
