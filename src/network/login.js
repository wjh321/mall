import { request } from './request'


//登录信息验证
export function login(username,password) {
    return request({
        method:'post',
        url: 'login',      
        data: {
            username,
            password
        }
       
    })
}