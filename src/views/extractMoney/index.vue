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
            <span class="card_id">(尾号6699)</span>
          </div>
        </div>

        <div class="money">
          <div class="top">可提金额: 25680.98元</div>
          <div class="bottom">
            <span>￥</span>
            <input type="text">
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
          <div class="left">开户行行号</div>
          <div class="card_id"><input type="text" placeholder="联系银行获取联行号并输入"></div>
        </div>

        <div class="extract_money_info">
          <div class="top common">
            <div class="left">提现费用:</div>
            <div class="right">每笔1元</div>
          </div>
          <div class="bottom common">
            <div class="left">预计到账时间:</div>
            <div class="right">每日到账,最晚T+1</div>
          </div>
        </div>

        <div class="extract_btn">
          提现
        </div>

        <div class="read_info">
          我已阅读并同意 <span>《钱满仓提现服务协议》</span>
        </div>

        <div class="extract_info">
          提现说明
        </div>

      </div>
  </div>
</template>
<script>
export default {
  name: 'extractMoney',
  data () {
      return {
          bigMoneyCard: false,
          blankImg: './static/images/blankLogo/ABC.png'
      }
  },
  methods: {
    toggleTap() {
      this.bigMoneyCard = !this.bigMoneyCard
    }
  }
}
</script>
<style lang="stylus" scoped>
@import './extractMoney.stylus';
</style>
