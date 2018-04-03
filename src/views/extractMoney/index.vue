<template>
  <div id="extractMoney">
      <div class="main">
        <div class="blank">
          <div class="left">提现至:</div>
          <div class="right">
            <span class="blank_img">
              <img :src="blankImg" alt="">
            </span>
            <span>中国工商银行</span>
            <span class="card_id">(尾号{{ bankNum }})</span>
          </div>
        </div>

        <div class="money">
          <div class="top">可提金额: {{ canUseMoney }}元</div>
          <div class="bottom">
            <span>￥</span>
            <input type="number" @focus="errShow = false" class="numBerFont" v-model="moenyCash" placeholder="请输入金额">
          </div>
        </div>

        <div class="mark_big">
          <div class="tip">大额提现 <span>(单笔5万以上)</span></div>
          <div class="toggle_btn">
            <div class="row" >
                <input type="checkbox" id="inset_3" @click="toggleTap">
                <label for="inset_3" class="green"></label>
            </div>
          </div>
        </div>

        <div v-if="bigMoneyCard" class="big_money_card">
          <span class="left">开户行行号</span>
          <input type="text" @focus="errShow = false" v-model="openAccountCard" placeholder="联系银行获取联行号并输入">
        </div>

        <div class="extract_money_info">
          <div class="top common">
            <div class="left">提现费用:</div>
            <div class="right">每笔1元</div>
          </div>
          <div class="bottom common">
            <div class="left">预计到账时间:</div>
            <div class="right">{{ withdrawMessage }}</div>
          </div>
        </div>

        <div class="extract_btn" @click="goWithdraw">
          提现
        </div>

        <div class="read_info">
          我已阅读并同意 <a href="https://www.qianmancang.com/mobile/mobile-withdrawAgreement" style="color: #3836e9">《钱满仓提现服务协议》</a>
        </div>

        <a class="extract_info" href="javascript: void(0);" @click="$router.push('/extractServerTip')">
          提现说明
        </a>
        <shadow-box :containerShow='dataChild' @shadowBoxData='shadowBoxData' v-if="boxBoolean"></shadow-box>
        <div v-show="errShow" class="err_message">
          {{ errMessage }}
        </div>
      </div>
      <div v-html='htmlPage'>
        {{ htmlPage }}
      </div>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import ShadowBox from '../accountCenter/shadow_box'
export default {
  name: 'extractMoney',
  components: {
    ShadowBox
  },
  data () {
      return {
          bigMoneyCard: false,
          blankImg: '',
          boxBoolean: false,
          dataChild: {
            title: '提示',
            containerBoolean: false,
            beginTime: '',
            endTime: ''
          },
          canUseMoney: '',
          bankNum: '',
          holiday: false,
          tempBoolean: false,
          cardLimit: 0,
          moenyCash: '',
          withdrawMessage1: '',
          withdrawMessage2: '',
          withdrawMessage3: '',
          withdrawMessage: '实时到账',
          errShow: false,
          errMessage: '',
          openAccountCard: '',
          beginTime: '',
          endTime: '',
          htmlPage: ''
      }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    ...mapActions([
      'changeLoading'
    ]),
    toggleTap() {
      console.log(this.commonJs.getTimeNow().hours,this.commonJs.getTimeNow().hourMinute,this.beginTime)
      // 判断是否正常工作时间
      if(!this.holiday && this.commonJs.getTimeNow().hourMinute >= this.beginTime && this.commonJs.getTimeNow().hourMinute <= this.endTime){
        this.bigMoneyCard = !this.bigMoneyCard
        if(this.bigMoneyCard){
          if(this.moenyCash < this.cardLimit){
            this.withdrawMessage = this.withdrawMessage2
          }else{
            this.withdrawMessage = this.withdrawMessage3
          }

        }else{
          // 小额
          this.withdrawMessage = this.withdrawMessage1
        }
      }else{
        this.tempBoolean = !this.tempBoolean
        this.boxBoolean = this.tempBoolean
      }

    },
    shadowBoxData(val) {
      this.boxBoolean = val
    },
    getInfo(){
      this.$http({
        method: 'post',
        url: this.api + '/app/withdrawCash/withdrawCash',
        params: {
          token: this.token,
          userId: ''
        }
      }).then(data => {
        console.log(data)
        if(data.data && data.data.code === '200'){
          const dataTemp = data.data.dataBody
          this.blankImg = dataTemp.src
          this.canUseMoney = dataTemp.userLimit
          this.bankNum = dataTemp.bankNo.substring(dataTemp.bankNo.length-4)
          this.holiday = dataTemp.holiday
          this.cardLimit = dataTemp.cardLimit
          this.withdrawMessage1 = dataTemp.withdrawMessage1
          this.withdrawMessage2 = dataTemp.withdrawMessage2
          this.withdrawMessage3 = dataTemp.withdrawMessage3
          this.openAccountCard = dataTemp.payAllianceCode
          this.beginTime = parseFloat(dataTemp.beginTime.replace('-', '.'))
          this.dataChild.beginTime = dataTemp.beginTime
          this.endTime = parseFloat(dataTemp.endTime.replace('-', '.'))
          this.dataChild.endTime = dataTemp.endTime

        }
        this.$store.commit('changeLoading', false)
      }).catch(err => {
        console.log(err)
        this.$store.commit('changeLoading', false)
      })
    },
    goWithdraw() {
      console.log(this.beginTime, this.endTime)
      if(this.isTrueGoWithdraw()){
        this.$store.commit('changeLoading', true)
        this.$http({
          method: 'post',
          url: this.api + '/app/fdep/user/withdraw',
          params: {
            token: this.token,
            money: this.moenyCash,
            routeCode: this.bigMoneyCard ? 2 : 1,
            cardBankCnaps: this.bigMoneyCard ? this.openAccountCard : ''
          }
        }).then(data => {
          console.log(data)
          if(data.data && data.data.code === '200'){
            this.htmlPage = data.data.dataBody.withdrawResponse
            this.$nextTick(() => {
              console.log(document.getElementById("frm1"), this.htmlPage)
              document.getElementById("frm1").submit()
            })
          }else{
            this.commonJs.toggle(this,data.data.message)
          }

          this.$store.commit('changeLoading', false)
        }).catch(err => {
          console.log(err)
          this.$store.commit('changeLoading', false)
        })
      }
    },
    isTrueGoWithdraw(){
      if(this.moenyCash < 1){
        this.errShow = true
        this.errMessage = '提现金额大于等于1元'
        return false
      }else{
        this.errShow = false
      }
      if(this.bigMoneyCard && !this.openAccountCard){
        this.errShow = true
        this.errMessage = '请输入开户行行号'
        return false
      }else{
        this.errShow = false
      }
      if(this.moenyCash > this.canUseMoney){
        this.errShow = true
        this.errMessage = '提现金额需小于可提金额'
        return false
      }else{
        this.errShow = false
      }
      return true
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './extractMoney.styl';
</style>
