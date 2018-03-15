<template>
  <div id="accountCenter">
      <div class="main">
        <div class="top_box">
          <div class="info">
            <div class="left">{{ commonJs.dealTelStr(userName) }}</div>
            <div class="right" @click="setOut">退出登录</div>
          </div>
          <div class="money_info">
            <div class="img"></div>
            <div class="text">可用余额</div>
            <div class="money"><span>￥</span>{{ ableMoney }}</div>
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
                <span v-else class="control_btn">去开通</span>
              </div>
            </div>
            <div class="trade_password user_li">
              <div class="text">交易密码</div>
              <div class="control">
                <span v-if="tradeBoolean" class="control_text">已设置</span>
                <span v-else class="control_btn" :class="{unable_btn: !blankBoolean}">去设置</span>
              </div>
            </div>
            <div class="repayment user_li">
              <div class="text">还款授权</div>
              <div class="control">
                <span v-if="repeamentBoolean" class="control_text">已授权</span>
                <span v-else class="control_btn" :class="{unable_btn: !tradeBoolean}">去授权</span>
              </div> 
            </div>
          </div>
        </div>

        <div class="footer">
          <div @click="drawCashBtn" class="btn" :class="{active_btn: activeBtn}">
            提现
          </div>
        </div>
        <shadow-box @shadowBoxData='shadowBoxData' v-if="boxBoolean"></shadow-box>
      </div>
      
  </div>
</template>
<script>
import ShadowBox from './shadow_box'
export default {
  name: 'accountCenter',
  components: {
    ShadowBox
  },
  data () {
      return {
          userName: '13889386888', 
          activeBtn: false,
          ableMoney: '10.50',
          blankBoolean: true,
          tradeBoolean: true,
          repeamentBoolean: true,
          boxBoolean: false
      }
  },
  mounted(){
    this.getInfo()
  },
  methods: {
    drawCash() {
      if(this.blankBoolean && this.tradeBoolean && this.repeamentBoolean){
        this.activeBtn = true
      }
    },
    getInfo() {
      this.drawCash()
    },
    drawCashBtn() {
      if(this.activeBtn){
        this.$router.push('/hy/extractMoney')
      }
    },
    setOut() {
      this.$router.push('/hy/login')
    },
    shadowBoxData(val) {
      console.log(val)
      this.boxBoolean = val
    },
    questionMethod() {
      this.boxBoolean = true
    }
  },
  watch: {
    
  }
}
</script>
<style lang="stylus" scoped>
@import './accountCenter.stylus';
</style>
