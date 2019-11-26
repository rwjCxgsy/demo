<template>
    <div class="home">
        <router-link to="/cdsub">成都地图</router-link>
        <router-link to="/range">日期选择器</router-link>
        <!-- <router-link to="/scroll">scroll</router-link> -->
        <router-link to="/fall">fall</router-link>
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

<style lang="less">
    a {
        display: block;
        height: 30px;
    }
</style>
