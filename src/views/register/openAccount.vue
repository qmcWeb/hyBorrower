<template>
  <div id="openAccount">
      <div class="main">
        <div class="top">
          为了您的资金安全，请务必输入您本人的身份证号和银行卡号码。
        </div>
        <div class="account login_input_box">
          <input v-model="account" class="login_input" type="text" placeholder="请输入真是姓名">
        </div>
        <div class="password login_input_box">
          <input maxlength="18" ref="password" v-model="password" class="login_input" type="text" placeholder="请输入身份证号">
        </div>


        <div :class="{login_btn: true, active_btn: activeBtn}" @click="loginMethod">
          <span>立即开户</span>
        </div>
        <div class="control">
          注册账户代表您同意<span>《江西银行资金帐户服务第三方协议》</span>
        </div>
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>
        <div class="footer">
          <h3>温馨提示</h3>
          <div class="content">
            1. 为了您的资金安全，江西银行电子交易账户采用资金
            原卡进出设置，只能提现至您绑定的银行卡。所以请绑
            定常用借记卡哦。<br/>
            2. 二类银行卡账户每天转账限额1万元，建议您在帮卡
            前核实是否为二类银行卡。
          </div>

        </div>
      </div>
      <div v-html="pageData">
          {{ pageData }}
      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'openAccount',
  data () {
      return {
          account: '',
          password: '',
          errMessage: '手机号输入错误',
          errShow: false,
          checkPasswordBoolean: false,
          activeBtn: false,
          checkNameBoolean: false,
          pageData: '',
          dataShow: true
      }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  created() {
    this.$watch('account', this.commonJs.debounce(() => {
      this.checkName()
    }))
    this.$watch('password', this.commonJs.debounce(() => {
      this.checkPassword()
    }))
  },
  mounted(){
    this.$store.commit('changeLoading', false)
  },
  // updated (){
  //   // console.log(1,document.getElementById("frm1"))
  // },
  methods: {

    hideDelete() {
      this.delete_active = false
      this.account = ''
    },
    loginMethod() {

      if(this.activeBtn){
        this.$store.commit('changeLoading', true)
        this.$http({
          method: 'post',
          url: this.api + '/app/fdep/user/accountOpenPage',
          params: {
            token: this.token,
            realName: this.account,
            IDCard: this.password
          },
          withCredentials: true
        }).then(data => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.pageData = data.data.dataBody.accountOpen
            this.$nextTick(() => {
              this.$store.commit('changeLoading', false)
              document.getElementById("frm1").submit()
            })

          }else{
            this.errShow = true
            this.errMessage = data.data.message;
            setTimeout(function(){
              this.errShow=false
            },2000)
            this.$store.commit('changeLoading', false)
          }
        }).catch(err => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })

      }
    },
    checkPassword() {
      this.checkPasswordBoolean = this.commonJs.checkIdNum(this.password)
      if(!this.checkPasswordBoolean){
        this.commonJs.toggle(this,'身份证号不正确')
      }else{
        this.errShow = false
      }
      if(this.checkNameBoolean && this.checkPasswordBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    },
    checkName() {
      this.checkNameBoolean = this.commonJs.checkRealName(this.account)
      console.log(this.account)
      if(!this.checkNameBoolean){
        this.commonJs.toggle(this,'真实姓名不正确')
      }else{
        this.errShow = false
      }
      if(this.checkNameBoolean && this.checkPasswordBoolean){
        this.activeBtn = true
      }else{
        this.activeBtn = false
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './openAccount.styl';
</style>
