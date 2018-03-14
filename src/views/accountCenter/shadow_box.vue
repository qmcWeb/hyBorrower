<template>
  <div id="shadowBox">
      
      <div class="main">
          <div class="content">
              <h3>开户及授权说明</h3>
              <div class="text">
                1. 系统已接入江西银行存管，所有资金都从银行进出，所以您必须先在银行开设存管账户。<br/>
                2. 存管账户交易需要先设置交易密码。<br/>
                3. 根据合规要求，还款需要用户主动操作或授权平台操作。为方便客户还款，需要客户先授权。还款日系统会自动冻结账户资金还款。
              </div>
              <div class="btn" @click="closeBox">
                  以了解
              </div>

          </div>
          <div class="img" @click="closeBox">
               <img src="../../assets/images/accountCenter/delete_img.png" alt="">
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'shadowBox',
  data () {
      return {
          
      }
  },
  methods: {
      closeBox() {
          this.$emit('shadowBoxData', false)
      }
  }
}
</script>
<style lang="stylus" scoped>
@import './shadow_box.stylus'
</style>
