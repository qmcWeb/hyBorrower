<template>
  <div id="blank">

  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  name: 'blank',
  data () {
      return {

      }
  },
  computed: {
    ...mapState([
      'token'
    ])
  },
  created(){
    this.getInfo()
  },
  methods: {
    ...mapActions([
      'changeLoading',
      'changeUser'
    ]),
    getInfo() {
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
          this.$router.push('/accountCenter')
        }else{
            this.setOut();
        }
      }).catch(err => {
        console.log(err)
      })
    },
    setOut() {
      this.$store.commit('changeUser', null)
      this.$router.push('/login')
    },

  },
}
</script>
<style lang="stylus" scoped>
</style>
