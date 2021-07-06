<template>
<div class="button-bar">
    <div class="reigon">
    <check-button class="check-button"></check-button>
    <span>全选</span>
    </div>
    
</div>
</template>


<script>
import CheckButton from '@/components/content/checkButton/CheckButton'

export default {
    name:"CartButtonBar",
    components:{
    CheckButton,
    },
    

}
// 选中与否都是要在模型里记录的
</script>

<style scoped>
.button-bar{
    height: 40px;
    background-color: #eee;
    position: relative;
}
.reigon{
    display:flex ;
    align-items: center;
}
.check-button{
    width: 20px;
    height: 20px;
    
}
</style>