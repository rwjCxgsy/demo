<template>
    <div class="home">
        <router-link to="/cdsub">成都地图</router-link>
        <p>{{num}}</p>
        <router-link to="/range">日期选择器</router-link>
    </div>
</template>

<script>
// import Test from './test'
export default {
    name: 'home',
    // components: {Test},
    data () {
        return {
            show: false,
            num: 1000,
        }
    },
    mounted () {
        // const animate = () => {
        //     requestAnimationFrame(animate)
        //     // const {number} = this
        //     // const time = 20
        //     this.num *= 2
        // }
        // animate()
    }
}
</script>

<style scoped lang="less">
    div {
        position: relative;
        // div {
        //     height: 100px;
        //     color: #fff;
        // }
    }
    .left {
        float: left;
        width: 100px;
        background-color: blue;
    }
    .right {
        left: 100px;
        right: 0;
        position: absolute;
        // margin-left: 100px;
        background-color: yellow;
    }
    button {
        width: 20cm;
    }
    .home::after {
        content: '::'
    }
    .home:after{
        content: ':'
    }
</style>
