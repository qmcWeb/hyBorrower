<template>
  <div id="accountCenter">
      <div class="main">
        <div class="top_box">
          <div class="info">
            <div class="left">{{ realUserName ? realUserName : commonJs.dealTelStr(userName) }}</div>
            <div class="right" >
              <span @click="setOut">退出登录</span>
            </div>
          </div>
          <div class="money_info">
            <div class="img"></div>
            <div class="text">可用余额</div>
            <div class="money numBerFont"><span>￥</span>{{ ableMoney }}</div>
          </div>
        </div>

        <div class="middle_box">
          <div class="tip">
            借款放贷前，请先开通银行存管并授权还款
            <span @click="questionMethod" class="question_img"></span>
          </div>

          <div class="user_all_info">
            <div class="blank user_li">
              <div class="text">江西银行存管账户</div>
              <div class="control">
                <span v-if="blankBoolean" class="control_text">已开通</span>
                <span v-else class="control_btn" @click="goOpenAccount">去开通</span>
              </div>
            </div>
            <div class="user_blank_info" v-show="blankBoolean">
              <div class="user_cun_account">
                <span>存管账户 :</span>
                <span> {{ accountCard }}</span>
              </div>
              <div class="user_blank_id">
                <span>银行卡号 :</span>
                <span> 尾号{{ blankCard }}</span>
              </div>
            </div>
            <div class="trade_password user_li">
              <div class="text">交易密码</div>
              <div class="control">
                <span v-if="tradeBoolean" class="control_text">已设置</span>
                <span v-else class="control_btn" @click="goSetPassword"  :class="{unable_btn: !blankBoolean}">去设置</span>
              </div>
            </div>
            <div class="repayment user_li">
              <div class="text">还款授权</div>
              <div class="control">
                <span v-if="repeamentBoolean" class="control_text">已授权</span>
                <span v-else class="control_btn" @click="goSetPower" :class="{unable_btn: !tradeBoolean}">去授权</span>
              </div>
            </div>
            <div class="paymoney_power user_li">
              <div class="text">缴费授权</div>
              <div class="control">
                <span v-if="paymoneyPowerBoolean" class="control_text">已授权</span>
                <span v-else class="control_btn" @click="goPaymoneyPower" :class="{unable_btn: !repeamentBoolean}">去授权</span>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div @click="drawCashBtn" class="btn" :class="{active_btn: activeBtn}">
            提现
          </div>
        </div>
        <shadow-box :containerShow='dataChild' @shadowBoxData='shadowBoxData' v-if="boxBoolean"></shadow-box>
        <set-out  @setOutShow='setOutShow' @setOutSure='setOutSure' v-if="setOutData"></set-out>
      </div>
      <div v-html='htmlPage'>
        {{ htmlPage }}
      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ShadowBox from './shadow_box'
import SetOut from '../../components/shodow/shadowbox'
export default {
  name: 'accountCenter',
  components: {
    ShadowBox,
    SetOut
  },
  data () {
      return {
          userName: '',
          realUserName: '',
          activeBtn: false,
          ableMoney: '0.0',
          blankBoolean: false,
          tradeBoolean: false,
          repeamentBoolean: false,
          paymoneyPowerBoolean: false,
          boxBoolean: false,
          dataChild: {
            title: '开户及授权说明',
            containerBoolean: true
          },
          htmlPage: '',
          prefInfoBoolean: false,
          accountCard: '',
          blankCard: '',
          setOutData: false,
      }
  },
  computed: {
    ...mapState(['token'])
  },
  created(){
    const promise = new Promise((resolve, reject) => {
      this.$http({
        method: 'post',
        url: this.api + '/app/user/getUserAccountInfo',
        params: {
          token: this.token
        }
      }).then((data) => {
        console.log(data)
        if(data.data && data.data.code === '200'){
          this.prefInfoBoolean = true
          this.realUserName = data.data.dataBody.name
          this.accountCard = data.data.dataBody.accountId
          this.blankCard = data.data.dataBody.bankCard
          resolve()
        }else{
          resolve()
        }
      }).catch(err => {
        console.log(err)
        this.$store.commit('changeLoading', false)
      })

    })
    promise.then(() => {
      this.getInfo()
    })


  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeUser'
    ]),
    setOutShow(val){
      this.setOutData = val
    },
    drawCash() {
      if(this.blankBoolean && this.tradeBoolean && this.repeamentBoolean && this.paymoneyPowerBoolean){
        this.activeBtn = true
      }
    },
    getInfo() {
      console.log(this.prefInfoBoolean)
      this.$http({
        method: 'post',
        url: this.api + '/app/user/userCenterInfo',
        withCredentials: true,
        params: {
          token: this.token
        }
      }).then((data) => {
        console.log(data)
        if(data.data && data.data.code === '200'){
          const dataTemp = data.data.dataBody
          this.userName = dataTemp.mobile
          this.ableMoney = dataTemp.canUseBalance
          this.blankBoolean = this.prefInfoBoolean ? true : false
          this.tradeBoolean = dataTemp.isPasswordSet === 'true' ? true : false
          this.repeamentBoolean = dataTemp.isRepayAuthSet === 'true' ? true : false
          this.paymoneyPowerBoolean = dataTemp.isPaymentAuthSet === 'true' ? true : false
          this.drawCash();
          this.$store.commit('changeLoading', false)
        }else{
            this.setOut();
        }
      }).catch(err => {
        console.log(err)
        this.$store.commit('changeLoading', false)
      })

    },
    drawCashBtn() {
      if(this.activeBtn){
        this.$router.push('/extractMoney')
      }
    },
    setOut() {
      this.setOutData = true;
    },
    setOutSure(){
      this.$store.commit('changeUser', null)
      this.$router.push('/login')
    },
    shadowBoxData(val) {
      console.log(val)
      this.boxBoolean = val
    },
    questionMethod() {
      this.boxBoolean = true
    },
    goOpenAccount(){
      // 去开通江西银行账户
       this.$router.push('/openAccount')
    },
    goSetPassword(){
      // 设置交易密码
      if(!this.tradeBoolean && this.blankBoolean){
        this.$http({
          method: 'post',
          url: this.api + '/app/fdep/user/passwordSet',
          withCredentials: true,
          params: {
            token: this.token
          }
        }).then(data => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.htmlPage = data.data.dataBody.responseHtml
            this.$nextTick(() => {
              console.log(document.getElementById("frm1"), this.htmlPage)
              document.getElementById("frm1").submit()
            })
          }
          this.$store.commit('changeLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })
      }
    },
    goSetPower(){
      // 设置还款授权
      if(!this.repeamentBoolean && this.tradeBoolean){
        this.$http({
          method: 'post',
          url: this.api + '/app/fdep/user/repayAuthPage',
          params: {
            token: this.token
          }
        }).then(data => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.htmlPage = data.data.dataBody.paymentAuth
            this.$nextTick(() => {
              document.getElementById("frm1").submit()
            })
          }
          this.$store.commit('changeLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })
      }
    },
    goPaymoneyPower(){
      if(!this.paymoneyPowerBoolean && this.repeamentBoolean){
        this.$http({
          method: 'post',
          url: this.api + '/app/fdep/user/paymentAuthPage',
          params: {
            token: this.token
          }
        }).then(data => {
          if(data.data && data.data.code === '200'){
            this.htmlPage = data.data.dataBody.paymentAuth
            this.$nextTick(() => {
              document.getElementById("frm1").submit()
            })
          }
          this.$store.commit('changeLoading', false)
        }).catch(err => {
          console.log(err) 
          this.$store.commit('changeLoading', false)
        })
      }
    }
  },
  watch: {

  }
}
</script>
<style lang="stylus" scoped>
@import './accountCenter.styl';
</style>
