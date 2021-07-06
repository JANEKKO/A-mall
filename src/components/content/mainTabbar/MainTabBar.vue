<template>
     <tab-bar>
   <tab-bar-item path="/home"  >  
     <img slot="item-icon" src="../../../assets/image/tabbar/sprouts.svg" >
     <img slot="item-icon-active" src="../../../assets/image/tabbar/pomegranate.svg">
     <div slot="item-text">首页</div>
   </tab-bar-item>
   <tab-bar-item path="/category"> 
     <img slot="item-icon" src="../../../assets/image/tabbar/strawberry.svg" >
     <img slot="item-icon-active" src="../../../assets/image/tabbar/pomegranate.svg">
     <div slot="item-text">分类</div> </tab-bar-item>
   <tab-bar-item path="/cart"> 
     <img slot="item-icon" src="../../../assets/image/tabbar/pumpkin.svg" >
     <img slot="item-icon-active" src="../../../assets/image/tabbar/pomegranate.svg">
     <div slot="item-text">购物车</div> </tab-bar-item>
   <tab-bar-item path="/profile"> 
     <img slot="item-icon" src="../../../assets/image/tabbar/cauliflower.svg" >
     <img slot="item-icon-active" src="../../../assets/image/tabbar/pomegranate.svg">
     <div slot="item-text">我的</div> </tab-bar-item>

  </tab-bar>
</template>


<script>
import TabBar from'../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
name:'MainTabBar',
components:{
     TabBar,
    TabBarItem,
}
}
</script>


