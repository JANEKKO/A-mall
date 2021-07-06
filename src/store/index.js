import Vue from 'vue'
import Vuex from 'vuex'
import mutations from '@/store/mutations' 
import actions from '@/store/actions'
import getters from '@/store/getters'

Vue.use(Vuex)

const state={
    cartList:[]
}
const store = new Vuex.Store({
    state,
    mutations,
    actions,//除了异步操作，有判断逻辑 的也放到action中
    getters,
})

export default store

