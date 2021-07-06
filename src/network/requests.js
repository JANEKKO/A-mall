
import axios from 'axios'
//import { config } from 'vue/types/umd'


 

//最终写法，它本身的返回值就是promise
export function request(config){
    //1.创建axios实例
    const instance = axios.create({
       // baseURL:'http://123.207.32.32:8000',
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })

    //2.axios的拦截器
    //拦截全局axios
    //2.1.请求拦截的作用
    axios.interceptors.request.use(config =>{
        //console.log(aaa);
    //1.比如config中一些信息不符合服务器要求
    //2.比如每次发送网络请求时，希望显示一个请求的图标，可以拦截然后show，请求成功再把其取消
    //3.某些网络请求，比如登录，必须携带一些特殊的信息，比如token，拦截到调转到登录的页面
    return config//拦截之后必须返回，不然拿不到就会请求失败
    },err=>{//请求没有发送出去
       // console.log(err);
    })

    //2.2响应拦截
    instance.interceptors.response.use(res=>{
      
        return res.data  //返回数据就可以了
    },err=>{
        console.log(err);
    })   

    //3.发送真正的网络请求
    //返回一个promise
    return   instance(config)  
}



// export function instance2(){
//     //可以创建多个实例
// }