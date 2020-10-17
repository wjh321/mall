import { request } from './request'

//获取左侧分类信息
export function getMeauList() {
    return request({
        method:'get',
        url: 'menus',          
    })
}