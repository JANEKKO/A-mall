import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

//对home 进行相关的懒加载
const Home =() => import(/**/'../views/home/Home.vue');
const Category =()=> import('../views/category/Category');
const Cart =()=> import('../views/cart/Cart');
const Profile =()=> import('../views/profile/Profile');
const Detail =()=>import('../views/detail/Detail')


export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home',
      meta:{
        isturn:true
      }
    },
    {
      path:'/home',
      component:Home,
      meta:{
        isturn:true
      }
    },
    {
      path:'/category',
      component: Category,
      meta:{
        isturn:true
      }
    },
    {
      path:'/cart',
      component:Cart,
      meta:{
        isturn:true
      }
    },
    {
      path:'/profile',
      component:Profile,
      meta:{
        isturn:true
      }
    },
    {
      path:'/detail/:iid',
      // 动态路由
      component:Detail,
      meta:{
        isturn:false
      }
    }
   
   

  ],
  mode:'history',
})
