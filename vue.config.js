module.exports={
    configureWebpack:{
        resolve:{
            alias:{
<<<<<<< HEAD
                '@':'src',
=======
>>>>>>> 175d4304f500e7ffe94bc5c8775705735a0c714c
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