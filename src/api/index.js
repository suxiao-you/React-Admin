/**
 * 包含应用中所有接口请求函数的模块
 */

 import ajax from './ajax'

 const BASE = ''

 // 登陆
export const reqLogin = (username, password) => ajax( BASE +'/login', {username, password}, 'POST')

// 添加用户
export const addUser = (user) => ajax( BASE +'/manage/user/add', user, 'POST')