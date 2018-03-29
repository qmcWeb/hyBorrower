import Vue from 'vue'
import Router from 'vue-router'
import blank from '../views/blank/index.vue'
import Login from '../views/login/index.vue'
import Register from '../views/register/register.vue'
import InfoCheck from '../views/register/infoCheck.vue'
import OpenAccount from '../views/register/openAccount.vue'
import ResetPassword from '../views/resetPassword/index.vue'
import ExtractMoney from '../views/extractMoney/index.vue'
import AccountCenter from '../views/accountCenter/index.vue'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'blank',
      component: blank,
      meta: {
        title: '汇银'
      }
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      meta: {
        title: '登录'
       }
    },
    {
      path: '/register',
      name: '注册',
      component: Register,
      meta: {
        title: '注册'
      }
    },
    {
      path: '/infoCheck',
      name: '短信验证',
      component: InfoCheck,
      meta: {
        title: '短信验证'
      }
    },
    {
      path: '/openAccount',
      name: '开户',
      component: OpenAccount,
      meta: {
        title: '开户'
      }
    },
    {
      path: '/resetPassword',
      name: '重置密码',
      component: ResetPassword,
      meta: {
        title: '重置密码'
      }
    },
    {
      path: '/extractMoney',
      name: '提现',
      component: ExtractMoney,
      meta: {
        title: '提现'
      }
    },
    {
      path: '/accountCenter',
      name: '我的账户',
      component: AccountCenter,
      meta: {
        title: '我的账户'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  window.document.title = to.meta.title;
  store.commit('changeLoading', true)
  next()
})
// router.afterEach((to, from, next) => {

// })



export default router
