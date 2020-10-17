import { request } from './request'

export function getMeauList() {
    return request({
        method:'get',
        url: 'menus',          
    })
}