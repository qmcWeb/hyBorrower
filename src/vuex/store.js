import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

// vux 缓存插件使用
const vuexLocal = new VuexPersist({
    storage: window.localStorage
})

const store = new Vuex.Store({
    state: {
        loading: false,
        userObj: {
            userId: '',
            mobile: ''
        },
        token: localStorage.getItem('token') || null,
        registerUser: {
            mobile: '',
            password: '',
            captchamImg: ''
        },
        resetPassword: {
            resetPWToken: ''
        }
    },
    mutations: {
        changeLoading(state, value) {
            state.loading = value
        },
        changeUser(state, obj){
            localStorage.setItem('token', obj ? (obj.token || null) : null)
            state.token = obj ? (obj.token || null) : null
            state.userObj.userId = obj ? (obj.userId || '') : ''
            state.userObj.mobile = obj ? (obj.mobile || '') : ''
        },
        changeRegisterUser(state, obj){
            state.registerUser.mobile = obj.mobile
            state.registerUser.password = obj.password
            state.registerUser.captchamImg = obj.captchamImg
        },
        changeResetPassword(state, obj){
            state.resetPassword.resetPWToken = obj.resetPWToken || ''
        }
    },
    plugins: [vuexLocal.plugin]
})

export default store