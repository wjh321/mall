import { request } from './request'

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