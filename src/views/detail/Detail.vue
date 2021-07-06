<template>
    <div id="detail">
       
    <detail-nav-bar class="detail-navbar" @titleClick="titleClick" ref="nav"></detail-nav-bar>
     <scroll class="scroll-height" 
     ref="scroll" 
     :probe-type="3" @scroll="detailcontentscroll"
     >
        <!-- 必须要有固定高度 -->
    <ul>
        <li v-for="(item,index) in $store.state.cartList" :key="index">
            {{item}}
        </li>
        </ul>    
    <detail-swiper :top-images="topImages"></detail-swiper>
    <detail-base-info :goods="goods"></detail-base-info>
    <detail-shop-info :shop="shop"></detail-shop-info>
    <detail-goods-info :detail-info="detailInfo" @detailgoodsLoad="detailgoodsLoad"></detail-goods-info>
    <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
    <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
    <goods-list ref="recommend" :goods="recommends"></goods-list>
    <!-- <detail-bottom-bar @addCart = "addCart"></detail-bottom-bar> -->
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addCart" ></detail-bottom-bar>
    </div>
</template>
<!-- @imageLoad="imageLoad" -->

<script>
import DetailNavBar from '@/views/detail/childComps/DetailNavBar'
import {getDetail,GoodsInfo,Shop,GoodsParam,getRecommend} from '@/network/detail'
import DetailSwiper from '@/views/detail/childComps/DetailSwiper'
import DetailBaseInfo from '@/views/detail/childComps/DetailBaseInfo'
import DetailShopInfo from '@/views/detail/childComps/DetailShopInfo'
import Scroll from '@/components/common/scroll/Scroll'
import DetailGoodsInfo from '@/views/detail/childComps/DetailGoodsInfo'
import DetailParamInfo from '@/views/detail/childComps/DetailParamInfo'
import DetailBottomBar from '@/views/detail/childComps/DetailBottomBar'
import DetailCommentInfo from '@/views/detail/childComps/DetailCommentInfo'
import GoodsList from '@/components/content/goods/GoodsList'
import {  itemListenerMixin,backTopMixin } from "@/common/mixin";
import {debounce} from  "@/common/utils"

export default {
    name:'Detail',
     components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        GoodsParam,
        DetailParamInfo,
        DetailBottomBar,
        DetailCommentInfo,
        GoodsList,
    },
    mixins:[itemListenerMixin,backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0

        }
    },
   
    created(){
        //保存传入的iid
        this.iid=this.$route.params.iid
        //根据iid请求详情数据
    getDetail(this.iid).then(res=>{
        //获取顶部的图片轮播数据
        console.log(res);
        const data= res.result;
        this.topImages = data.itemInfo.topImages
        //console.log(this.topImages);
        //获取商品信息
        this.goods = new GoodsInfo(data.itemInfo,data.columns,data.shopInfo.services)
        //获取店铺信息
        this.shop = new Shop(data.shopInfo);
        //保存商品的详情数据
        this.detailInfo = data.detailInfo
        //获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //获取评论信息
        if(data.rate.cRate !== 0){
            this.commentInfo =data.rate.list[0];
        }

        // this.$nextTick(()=>{
        //     //根据最新的数据，对应的DOM已经被渲染出来了，但是图片依然没有加载完，即
        //     //目前获取的offsetTop是不包含图片的，导致值不对
        // this.themeTopYs =[]
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
        // })

       
    }),
     
     //给getThemeTopY赋值，对给getThemeTopY赋值的操作进行防抖
        this.getThemeTopY = debounce(()=>{
        this.themeTopYs =[]
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        this.themeTopYs.push(Number.MAX_VALUE)
        //console.log(this.themeTopYs);
        },100)

    //请求推荐数据
     getRecommend().then(res=>{
        this.recommends = res.data.list
    })
    //监听详情图片加载完成
    
       
    },
    mounted(){
       
    },
   updated(){
        
   },
    activated(){
         this.$refs.scroll.scroll.refresh()
     },

     methods:{
     detailgoodsLoad(){
        this.newRefresh(); 
        this.getThemeTopY();
    },
     addCart() {
        //获取购物车需要展示的信息，对象的形式
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.newPrice = this.newPrice;
        //将商品添加购物车里 vuex
        this.$store.dispatch('addCart',product).then(res => {
         // console.log(res)
        })
       // this.$store.commit('addCart',product)
      },
     titleClick(index){
         //console.log(index);
         this.$refs.scroll.scrollTo(0,-this.themeTopYs[index], 200)
     },
     detailcontentscroll(position){
      const positionY = -position.y;
      let length=this.themeTopYs.length;
      for(let i=0;i< length-1;i++){
          if(this.currentIndex!==i 
             &&(
                 //(i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1 && positionY>=this.themeTopYs[i])
               positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]
               )
            ){
             this.currentIndex=i;
             //console.log(this.currentIndex);
             this.$refs.nav.currentIndex=this.currentIndex;
          }
      }
      //this.isShowBackTop = -position.y>1000
       this.listenShowTopBack(position);
     }

     }
            
}
</script>


<style scoped>
.detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    /* 上面这个方法对隐藏tab-bar没起作用，可以使用路由设置 */
    height: 100vh;
    
}
.detailcontent {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 58px;
    /* overflow: hidden; */
   /* height: 400px; */
   /* height: calc(100% - 44px - 58px);  */
   overflow: hidden;
}
/* .detailcontent{
    height: calc(100% - 44px);
    overflow: hidden;
     position: absolute;
    overflow: hidden;
    top:44px;
    bottom:49px;
    left:0;
    right: 0; 
} */
.detail-navbar{
    /* position: relative;
    z-index: 9; */
    background-color: burlywood;
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index:9;
}
.scroll-height {
  position: absolute;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
}
</style>

