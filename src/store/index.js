/*需要引入vuex的*/
import  Vue from  'vue';//主体
import  Vuex from 'vuex';//主体
import * as actions from './notes/actions' //肯定是需要引入actions
import * as getters from './notes/getters' //getters
import  mutations from './notes/mutations' //getters
import plugins from './notes/localPlugins'//插件
import userAuth from './notes/userAuth'//插件
Vue.use(Vuex);//引入全局

//创建state 类似初始数据
const state = {
  vuexWidth:0,//控制侧边栏的变化
  sidebarNumber:'1',
  sidebarName:'车位状态图',
  messagePush:true,//消息推送,
  activeNote:{
    text:true
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  userAuth,
  plugins: plugins
})
