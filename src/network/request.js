import axios from 'axios'
export function request(config){
    const instance =axios.create({
        baseURL:'http://127.0.0.1:8888/api/private/v1/',
        timeout:5000
    })
    instance.interceptors.request.use(config => {
        console.log('请求拦截器执行了');
            return config
        }, err => {
            console.log(err);
        })
        
    instance.interceptors.response.use(res => {
        console.log('响应拦截器执行了');
        return res.data
    }, err => {
        console.log(err);
    })
        return instance(config)
  
}