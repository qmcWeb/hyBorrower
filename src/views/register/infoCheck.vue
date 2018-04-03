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
          <input maxlength="6" ref="check_input"  v-model="checkNumCon" class="login_input" type="text" placeholder="短信验证码" @focus="errShow=false">
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
import { mapActions, mapState } from 'vuex'
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
          countNum: '60s',
          isCountDao: true,
      }
  },
  computed: {
    ...mapState([
      'registerUser'
    ])
    
  },
  created() {
    //监测每个输入框是否有值，点亮提交btn
    let _this=this;
    this.$watch(function () {
        return [_this.checkNumCon]
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
    setTimeout(() => {
      if(this.isCountDao){
        this.getCountDown()
      }
      this.getInfo()
    },200)
    
  },
   beforeRouteEnter (to, from, next) {
    
    next(vm => {
      if(from.path === '/register'){
        vm.isCountDao = true
        vm.countNum = '60s'
      }else{
        vm.isCountDao = false
        vm.countNum = '重新获取'
      }
    })
  },
  methods: {
    ...mapActions([
      'changeLoading'
    ]),
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
      console.log(this.registerUser)
      if(this.activeBtn){
        this.$store.commit('changeLoading', true)
        this.$http({
          method: 'post',
          url: this.api + '/app/platform/registTwo',
          withCredentials: true,
          params: {
            mobileNum: this.registerUser.mobile,
            password: this.registerUser.password,
            authCode: this.checkNumCon,
            source: 'huiyin'
          }
        }).then((data) => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.$router.push('/openAccount')
            this.$store.commit('changeUser', Object.assign({}, data.data.dataBody, {mobile: this.registerUser.mobile}))
          }else{
            this.commonJs.toggle(this,data.data.message)
            this.$store.commit('changeLoading', false)
          }
        }).catch(err => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })

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
        this.getInfoAgain()
      }
    },
    getInfoAgain(){
      this.$http({
        method: 'post',
        url: this.api + '/app/platform/registOne',
        params: {
          mobileNum: this.registerUser.mobile,
          password: this.registerUser.password,
          captchaImg: this.registerUser.captchamImg
        },
        withCredentials: true
      }).then((data) => {
        console.log(data)
        if(data.data && data.data.code === '200'){

        }else{
          this.commonJs.toggle(this,data.data.message)
        }

      })
    },
    getInfo() {
      var str = this.$route.query.telNum.substring(3,7)
      this.telphoneNum = this.$route.query.telNum.replace(str, '****')
      this.$store.commit('changeLoading', false)
    }

  }
}
</script>
<style lang="stylus" scoped>
@import './infoCheck.styl';
</style>
