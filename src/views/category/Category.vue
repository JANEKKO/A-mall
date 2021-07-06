<template>

<!-- <div class="wrapper" ref="aaaa">
  
<li>yu</li>
<li>yu</li>
<li>yu</li>
<li>yu</li>
<li>yu</li>
<li>yu</li>
<back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
</div> -->
<div id="main" style="width: 600px;height:400px;"></div>

</template>


<script>
import * as echarts from 'echarts';
import BScroll from 'better-scroll'
import {  itemListenerMixin,backTopMixin } from "@/common/mixin";
export default {
    name:"Category",
    components:{
    
    },
    mixins:[backTopMixin],
    data(){
        return {
            scroll:null
        }
    },
    created(){
        // new BScroll('.content',{

        // })
     var myChart = echarts.init(document.getElementById('main'));   
    myChart.setOption({
    title: {
        text: 'ECharts Getting Started Example'
    },
    tooltip: {},
    xAxis: {
        data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
    },
    yAxis: {},
    series: [{
        name: 'sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
    }]
});
    },//组件创建完之后调用
    mounted(){

    }
}
</script>

<style scoped>
.wrapper{
    height: 150px;
    background-color: burlywood;
    /* overflow: scroll; */
    overflow: hidden;
}
</style>