import  {STORAGE_KEY} from './userAuth'
const localStoragePlugin = store=>{
  store.subscribe((mutation,state)=>{
    const syncedData = { userAuth: state.userAuth }
    localStorage.setItem(STORAGE_KEY,JSON.stringify(syncedData))
    if (mutation.type === 'UPDATE_USER_INFO') {
      localStorage.removeItem(STORAGE_KEY)//删除
    }
  })
}
export default [localStoragePlugin]//抛出
