<template>
<div class="check-button"  :class="{check:isChecked}">
<img src="@/assets/image/cart/tick.svg" alt="">
</div>
</template>


<script>

export default {
    name:"CheckButton",
    components:{
    
    },
    props:{
        isChecked:{
            type:Boolean,
            default:false
        }
    }

}
// 选中与否都是要在模型里记录的
</script>

<style scoped>
.check-button{
   
    border-radius: 50%;
    border:2px solid #aaa;
}
.check{
    border-color:crimson;
     background-color: crimson;
}
</style>