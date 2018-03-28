import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loading: false,
        IsLogged:false,
    },
    mutations: {
        changeLoading(state, value) {
            state.loading = value
        },
        changeIsLogged(state, value){
          state.IsLogged=value
        }
    }
})

export default store
