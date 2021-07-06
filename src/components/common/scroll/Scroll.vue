<template>
     <div class="wrapper" ref="wrapper">
        <!-- 如果绑定再组件中， 通过this.$refs.refnamre获取到的是组件对象
        如果绑定在普通的元素中，通过this.$refs.refnamre获取到的是元素对象 -->
   <div class="content">
   <slot></slot>
   </div>
   </div>
</template>

<script>
import BScroll, { PullUpLoad } from 'better-scroll'
export default {
    name:'Scroll',
    props:{
       probeType:{
         type:Number,
         default:0 
        },
        pullUpLoad:{
        type:Boolean,
        default:false
        },

    },
    data(){
   return{
       scroll:null
   }
    },
    mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
    click:true,//控制div元素是否可以点击
    probeType: this.probeType,
    pullUpLoad:this.pullUpLoad
    })
    //2.监听滚动的区域
    this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('scroll', position)
      })
      //3.监听上拉事件
    if(this.pullUpLoad){
       this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
    }) 
    }
    
    },
    methods:{
        scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
         },
    // 并且是为了保证this.scroll存在才执行
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 获取滚动的纵向距离
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
    // 滚动到指定元素
    scrollToElement(el, time) {
      this.scroll.scrollToElement(el, time);
    }
    }
}
</script>

<style scoped>

</style>
