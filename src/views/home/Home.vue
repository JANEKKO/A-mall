<template>
<div id="home">
   <nav-bar class="home-nav"> <div slot="center">购物街</div></nav-bar>
  <tab-control :title="['流行','新款','精选']" 
   @tabClick="tabClick"
   class="tab-control" v-show="isTabFixed"
   ref="tabControl1"
   ></tab-control>
  <scroll class="content"  ref="scroll" 
  :probe-type="3"  @scroll="contentScroll"
   :pull-up-load="true"   @pullingUp="loadMore"
    observeDOM:true  observeDOMImage:true>
   <home-swiper class="homeswiper" :banner="banner" @swiperImageLoad="swiperIamgeLoad1"></home-swiper>
   <home-recommend-view :recommend="recommend"></home-recommend-view>
   <home-feature-view></home-feature-view>
   <tab-control :title="['流行','新款','精选']" 
   @tabClick="tabClick"
   ref="tabControl2"
   ></tab-control>
   <goods-list :goods="showGoods"></goods-list>
</scroll> 
<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
<!-- 监听组件的原生事件必须要使用native ，不加:他会统一当成字符串
-->
</div>  
</template>


<script>
//导入业务组件
import HomeSwiper from '@/views/home/childComps/HomeSwiper'
import HomeRecommendView from '@/views/home/childComps/HomeRecommendView'
import HomeFeatureView from '@/views/home/childComps/HomeFeatureView'
import BackTop from '@/components/content/backTop/BackTop'

///导入公共组件
import NavBar from '../../components/common/navbar/NavBar.vue'
import TabControl from '@/components/content/tabContrl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
//导入函数
import {
    getHomeMultidata,
    getHomeGoods,
    } from "../../network/home";
import Swiper from '../../components/common/swiper/Swiper.vue'

export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        HomeRecommendView,
        HomeFeatureView,
        HomeFeatureView,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,
        Swiper,
        
    },
    data(){
        return {
            //result:null
            banner:[],
            recommend:[],
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]},
            },
            currentType:'pop',
            isShowBackTop:false,
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0,

        }
    },
    computed:{
        showGoods(){
            return this.goods[this.currentType].list
        }
    },
    created(){
        //组件创建完就赶紧发送网络请求
        //1.请求多个数据
        this.getHomeMultidatas()
        //2.请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
         
    },
    activated(){
    this.$refs.scroll.scroll.scrollTo(0,this.saveY);
    this.$refs.scroll.scroll.refresh()
    },
    deactivated(){
     //this.saveY=this.$refs.scroll.getScrollY();
     this.saveY=this.$refs.scroll.scroll.y;
    },
    methods:{
        // 网络请求相关方法
    getHomeMultidatas(){
        getHomeMultidata().then(res=>{
            this.banner=res.data.banner.list;
            this.recommend=res.data.recommend.list;
        })
    },
    getHomeGoods(type){
        const page= this.goods[type].page+1
        getHomeGoods(type,page).then(res=>{
            this.goods[type].list.push(...res.data.list)
            this.goods[type].page += 1;
           // console.log(res);
           this.$refs.scroll.scroll.finishPullUp()
        })
    },
   //、事件监听方法
   tabClick(index){
     switch(index){
         case 0: this.currentType='pop'
           break;
           case 1: this.currentType='new'
           break;
           case 2: this.currentType='sell'
           break;
     }
     this.$refs.tabControl1.currentIndex=index;
     this.$refs.tabControl2.currentIndex=index;

     },
   backClick(){
   this.$refs.scroll.scroll.scrollTo(0,0)
   },
   contentScroll(position){
       //判断是否吸顶
       this.isTabFixed=(-position.y) >this.tabOffsetTop ? true:false
       //1.判断backtop是否显示
       this.isShowBackTop = (-position.y) >1000 ? true:false
   },
   loadMore(){
    this.getHomeGoods(this.currentType)
    this.$refs.scroll.scroll.refresh()
   },
   swiperIamgeLoad1(){
       //所有组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.tabOffsetTop);
    this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop;
    
   },
   getScrollY(){
   return this.scroll ? this.scroll.y :0
//    return this.scroll ? this.scroll.y :0
   },
   } 
}
</script>

<style scoped>
/*这个scope是指这里的样式只对本文件起作用 
#home{
    padding-top: 44px;
} */
#home{
    /* padding-top:44px ; */
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color: darksalmon;
    color: white;
    /*z使用浏览器原生滚动时，让其不跟着滚动 */
    /* 
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
}

.content{
    position: absolute;
    overflow: hidden;
    top:44px;
    bottom:49px;
    left:0;
    right: 0;
    /* background-color: cyan; */
}
.tab-control{
    position: relative;
    z-index: 9;
}

</style>