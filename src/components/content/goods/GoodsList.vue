<template>
    <div class="goods" >
    <goods-list-item v-for="(item,index) in goods" :goods-item="item " :key="index"></goods-list-item>
   
    </div>
</template>

<script>
import GoodsListItem from '@/components/content/goods/GoodsListItem'
export default {
    name:"GoodsList",
     components:{
         GoodsListItem,
     },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    },
    

}
</script>

<style scoped>
.goods {
    display: flex;
    /* 设置为包裹，这样就可以根据宽度决定一行显示多少个 */
    flex-wrap: wrap;
    /* 从中间均等分 */
    justify-content: space-around;
    padding: 2px;
  }


</style>
