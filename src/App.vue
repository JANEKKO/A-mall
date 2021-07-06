<template>
<<<<<<< HEAD
  <div id="app">
    <keep-alive exclude="Detail">
    <router-view ></router-view>
  </keep-alive>
   <main-tab-bar v-show="$route.meta.isturn"></main-tab-bar>
  </div>
=======
<div id="app">

</div>
  
>>>>>>> 175d4304f500e7ffe94bc5c8775705735a0c714c
</template>

<script>

<<<<<<< HEAD
import MainTabBar from './components/content/mainTabbar/MainTabBar'
export default {
  name: 'App',
  components:{
  
    MainTabBar
=======
export default {
  name: 'App',
  components: {
    
>>>>>>> 175d4304f500e7ffe94bc5c8775705735a0c714c
  }
}
</script>

<style>
<<<<<<< HEAD
@import "assets/css/base.css";
=======
/* @import "./asset/css/base.css";配置了vue.config.js之后就不需要写./了 */
@import "asset/css/base.css";
>>>>>>> 175d4304f500e7ffe94bc5c8775705735a0c714c
</style>
