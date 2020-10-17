import { request } from './request'

export function getUsers(params) {
    return request({
        method:'get',
        url: 'users',
        params:{
            query:params.query,
            pagenum:params.pagenum,
            pagesize:params.pagesize
        }         
    })
}
export function changeState(uId,type) {
    return request({
        method:'put',
        url: `users/${uId}/state/${type}`,
               
    })
}
export function addUser(userInfo) {
    return request({
        method:'post',
        url: 'users',
        data:{
            username:userInfo.username,
            password:userInfo.password,
            email:userInfo.email,
            mobile:userInfo.phone
        }       
    })
}
export function deleteUser(Id) {
    return request({
        method:'delete',
        url: `users/${Id}`,
               
    })
}
export function getUserInfoById(Id) {
    return request({
        method:'get',
        url: `users/${Id}`,
               
    })
}
export function editUserInfo(userInfo) {
    return request({
        method:'put',
        url: `users/${userInfo.id}`,
        data:{
            email:userInfo.email,
            mobile:userInfo.mobile,
        }       
    })
}

export function editUserRole(id,role) {
    return request({
        method:'put',
        url: `users/${id}/role`,
        data:{
            rid:role   
            }      
    })
}