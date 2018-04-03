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
            <input oninput="if(value.length>11)value=value.slice(0,11)" v-model="account" class="login_input"  @focus="errShow=false" type="number" placeholder="手机号／用户名">
            <span @click="hideDelete" :class="{delete_active: delete_active}"></span>
          </div>
          <div class="check_input login_input_box">
            <input maxlength="4" @focus="errShow=false" ref="check_input"  v-model="checkNumCon" class="login_input" type="text" placeholder="输入图形验证码">
            <span class="show_check_img" @click="getImgCode">
              <img :src="imgCode" alt="">
            </span>
          </div>

        </div>

        <div v-if="showBoxNum === 2" class="second common">
          <div class="text_info">短信验证码已发送到{{ accountFilter }}</div>
          <div class="check_info_num login_input_box">
            <input maxlength="6" @focus="errShow=false" v-model="checkInfoNum" class="login_input" type="text" placeholder="短信验证码">
            <span @click="getAgainCount" class="show_check_num">{{ countNum }}</span>
          </div>

        </div>

        <div v-if="showBoxNum === 3" class="third common">
          <div class="first_password login_input_box">
            <input maxlength="16" @focus="errShow=false" v-model="firstPassword" class="login_input" type="text" placeholder="重置账户密码">
          </div>
          <div class="second_password login_input_box">
            <input maxlength="16" @focus="errShow=false" v-model="secondPassword" class="login_input" type="text" placeholder="再次确认密码(6-16位字母和数字组合)">
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
          account: '',
          checkNumCon: '',
          delete_active: false,
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
    //this.accountRight()
    this.getImgCode()
  },
  computed: {
    ...mapState([
      'resetPassword'
    ])
  },
  created() {
    //监测每个输入框是否有值，点亮提交btn
    //前两个
    let _this=this;
    this.$watch(function () {
        return [_this.account,_this.checkNumCon]
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
    //中间的
    this.$watch(function () {
        return [_this.checkInfoNum]
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
    //后面的
    this.$watch(function () {
        return [_this.firstPassword,_this.secondPassword]
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

//    this.$watch('account', this.commonJs.debounce(() => {
//      this.accountRight()
//    }))
//    this.$watch('checkNumCon', this.commonJs.debounce(() => {
//      this.checkNumMethod()
//    }))
//    this.$watch('checkInfoNum', this.commonJs.debounce(() => {
//      this.checkInfoNumMethod()
//    }))
//    this.$watch('firstPassword', this.commonJs.debounce(() => {
//      this.firstPasswordMethod()
//    }))
//    this.$watch('secondPassword', this.commonJs.debounce(() => {
//      this.secondPasswordMethod()
//    }))
  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeResetPassword'
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
        this.firstLogin()
      }else if(this.activeBtn && this.showBoxNum === 2){
        this.secondLogin()
      } else if(this.activeBtn && this.showBoxNum === 3){
        this.thirdLogin()
      }
    },
    firstLogin(){
      this.$store.commit('changeLoading', true)
      this.$http({
        method: 'post',
        url: this.api + '/app/platform/resetPWGCode',
        params: {
          imgCode: this.checkNumCon,
          mobile: this.account
        }
      }).then((data) => {
        this.activeBtn=false;
        console.log(data)
        if(data.data && data.data.code === '200'){
          this.showBoxNum++
          var str = this.account.substring(3,7)
          this.accountFilter = this.account.replace(str, '****')
          this.activeBtn = false
        }else{
                      this.commonJs.toggle(this,data.data.message)

        }
        this.$store.commit('changeLoading', false)
      }).catch(err => {
        console.log(err)
         this.$store.commit('changeLoading', false)
      })
    },
    secondLogin(){
      this.$store.commit('changeLoading', true)
      this.$http({
        method: 'post',
        url: this.api + '/app/platform/resetPWVCode',
        params: {
          mobile: this.account,
          captchaMobile: this.checkInfoNum
        }
      }).then(data => {
        this.activeBtn=false;
        if(data.data && data.data.code === '200'){
          this.showBoxNum++
          this.btnInfo = '重置密码'
          this.activeBtn = false
          this.$store.commit('changeResetPassword', data.data.dataBody || {})
        }else{
          this.commonJs.toggle(this,data.data.message)
        }
        this.$store.commit('changeLoading', false)
      }).catch(err => {
        console.log(err)
         this.$store.commit('changeLoading', false)
      })
    },
    thirdLogin() {
      this.$store.commit('changeLoading', true)
      this.$http({
        method: 'post',
        url: this.api + '/app/platform/resetPW',
        params: {
          password: this.firstPassword,
          rePassword: this.secondPassword,
          resetPWToken: this.resetPassword.resetPWToken,
          mobile: this.account
        }
      }).then(data => {
        if(data.data && data.data.code === '200'){
          this.$router.push('/login')
        }else{
          this.commonJs.toggle(this,data.data.message)
          this.$store.commit('changeLoading', false)
        }
      }).catch(err => {
        console.log(err)
        this.$store.commit('changeLoading', false)
      })
    },
    getInfoCodeAgain() {
      this.$http({
        method: 'post',
        url: this.api + '/app/platform/resetPWGCode',
        params: {
          imgCode: this.checkNumCon,
          mobile: this.account
        }
      }).then((data) => {
        console.log(data)
      })
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
        this.getInfoCodeAgain()
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
      this.commonJs.getCommonImgCode(this)
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
    },
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
@import './resetPassword.styl';
</style>
