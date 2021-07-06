//封装的对首页的所有的请求。做统一管理

import {request} from "./requests";
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}


export function getHomeGoods(type,page){
    return request({url:'/home/data',
 
    params:{
        type,
        page
    }
})
}