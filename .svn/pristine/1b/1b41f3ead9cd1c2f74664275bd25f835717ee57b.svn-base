export const STORAGE_KEY = 'user_pass';
let syncedData={
  userName:'',
  accessToken:null,
  userUid:'',
  sidebarNumber:'1'
}
// 与 local storage 同步.
if (localStorage.getItem(STORAGE_KEY)) {
  syncedData = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (syncedData) {
    syncedData = syncedData.userAuth
  }
}
const  state =Object.assign(syncedData);//对象磨合

const mutations={
  'UPDATE_USER_INFO':(state,userInfo)=>{//获取登陆过来的信息
    state.userName = userInfo.userName;
    state.accessToken = userInfo.accessToken;
    state.userUid = userInfo.userUid;
    state.sidebarNumber = userInfo.sidebarNumber;
  }
}
const actions = {};
export default {
  state,
  mutations,
  actions
}
