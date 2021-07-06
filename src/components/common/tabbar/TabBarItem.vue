<template>
   <div class="tab-bar-item" @click="itemClick">
  <slot v-if="!isActive" name="item-icon"></slot>
  <slot v-else name="item-icon-active"></slot>
  <div :style="activeStyle"> <slot name="item-text"></slot></div>
  </div>
      
</template>


<script>

export default {
    name:'TabBarItem',
    props:{
        path:String ,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    computed:{
        isActive(){
            return !this.$route.path.indexOf(this.path)
        },
        activeStyle(){
            return this.isActive? {color:this.activeColor}:{}
        }
    },
    methods:{
        itemClick(){
            this.$router.replace(this.path).catch(err=>err);
        },
    }
}
</script>


<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
  /* 49是一个常用的高度 */
}
.tab-bar-item img{
  width:24px;
  height:24px;
  vertical-align: middle;
  margin-bottom: 2px ;
}

</style>

