import {request} from '@/network/request'
//获取权限列表
export function getRights(){
    return request({
        method:'get',
        url:'rights/list',
    })

}
//获取角色列表
export function getRoles(){
    return request({
        method:'get',
        url:'roles'
    })
}
//删除角色权限
export function deleteRights(roleId,rightId){
    return request({
        method:'delete',
        url:`roles/${roleId}/rights/${rightId}`
    })
}
//获取树状权限列表
export function getTreeRights(roleId,rightId){
    return request({
        method:'get',
        url:'rights/tree',
    })
}
//设置用户权限
export function updateRights(roleID,str) {
    return request({
        method:'post',
        url:`roles/${roleID}/rights`,
        data:{
            rids:str
        }
    })
    
}
//添加角色信息
export function addRole(userInfo) {
    return request({
        method:'post',
        url: 'roles',
        data:{
            roleName:userInfo.rolename,
            roleDesc:userInfo.content,
        }       
    })
}
//根据ID获取角色信息
export function getRoleInfoById(Id) {
    return request({
        method:'get',
        url: `roles/${Id}`,            
    })
}
//修改角色信息
export function editRoleInfo(userInfo) {
    return request({
        method:'put',
        url: `roles/${userInfo.roleId}`,
        data:{
            roleName:userInfo.roleName,
            roleDesc:userInfo.roleDesc,
        }       
    })
}
//删除角色
export function deleteRole(Id) {
    return request({
        method:'delete',
        url: `roles/${Id}`,
               
    })
}