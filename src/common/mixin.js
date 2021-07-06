import {debounce} from "./utils"
import BackTop from '@/components/content/backTop/BackTop'

export const itemListenerMixin ={
    data(){
        return {itemImgListener: null,
            newRefresh :null,
        }
    },
    mounted(){
        this.newRefresh=debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () => {
            this.newRefresh()
        }
        //this.$bus.$on('itemLoad',this.itemImgListener)
        console.log('我是混入的内容');
    }
}

export const backTopMixin = {
   components:{
     BackTop
   },
    data() {
      return {
        // 当前滚动的位置
        curPosition: 0,
        isShowBackTop:false
      };
    },
    methods: {
      // 回到顶部
      backTop() {
        // 调用子组件里面封装的scrollTo方法即可
        this.$refs.scroll.scrollTo(0, 0);
      },
      listenShowTopBack(position){
        this.isShowBackTop = -position.y>1000
      }
    }
  };