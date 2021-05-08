module.exports={
    configureWebpack:{
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/common',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views',
                //router store是不需要的，因为在任何组件都可以通过this.$router以及this.$store获得
            }
        }
    }
}