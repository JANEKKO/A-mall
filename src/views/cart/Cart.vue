<template>
   <div class="cart">
       <nav-bar class="cart-navbar">
           <div slot="center">购物车（{{cartLength}}）</div>
       </nav-bar>
     
       <cart-list ></cart-list>
       
   </div>

</template>


<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from '@/views/cart/childComps/CartList'
import {mapGetters} from 'vuex'
import CartButtonBar from '@/views/cart/childComps/CartButtonBar'
import Scroll from '@/components/common/scroll/Scroll'

export default {
    name:"Cart",
    components:{
        NavBar,
        CartList,
        CartButtonBar,
        Scroll,
    },
    computed:{
       ...mapGetters(['cartLength','cartList'])
       //mapGetters辅助函数，将store中的getter映射到局部计算属性，从vuex导入
    },
    // activated(){
    // this.$refs.scroll.refresh()

    // }
}
</script>

<style scoped>
.cart{
    height: 100vh;
}
.cart-navbar{
    background-color: lightcoral;
    color: white;
    
}
.cart-list-style{
 height: calc( 100% - 44px -49px - 40px ) ;
 /* width: 100%;
 position: relative;
  height: 100%; */
}
/* .content{
     
  position: absolute;   
  top: 44px;
  right: 0;
  bottom: 99px;
  left: 0;
  overflow: hidden;
  width: 100%;
  background-color: #ffffff;
} */

</style>