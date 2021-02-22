/**
 * 进行local数据存储管理的工具模块
 */
import Store from 'store'

const USER_KEY = 'user_key'
//eslint-disable-next-line
export default {
  /**
   * 保存user
   */
  saveUser(user) {
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    Store.set(USER_KEY, user)
  },
  /**
   * 读取user
   */
  getUser () {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    return Store.get(USER_KEY) || {}
  },
  /**
   * 删除user
   */
  removeUser () {
    // localStorage.removeItem(USER_KEY)
    Store.remove(USER_KEY)
  }
}