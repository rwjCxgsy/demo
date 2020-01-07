<template>
    <div class="home">
        <div class="utils">
            <XgButton @click="jump('/cdsub', $event)">成都地图</XgButton>
            <XgButton @click="jump('/range')">日期选择器</XgButton>
            <XgButton @click="jump('/fall')">fall</XgButton>
            <XgButton @click="jump('/three')">3d</XgButton>
            <!-- <div class="box"></div> -->
        </div>
    </div>
</template>

<script>
// import Test from './test'
import XgButton from '../components/xgButton'
export default {
    name: 'home',
    components: {XgButton},
    data () {
        return {
            show: false,
            num: 1000,
        }
    },
    methods: {
        jump (path, e) {
            console.log(e)
            setTimeout(() => {
                this.$router.push(path)
            }, 600)
        } 
    }
}
</script>

<style lang="less">
    .box{
        width: 100px;
        height: 100px;
        color: #23b7cb;
        font-size: 15px;
        padding: 5px 15px;
        background: #fff;
        border: 1px transparent solid;
        border-radius: 30px;
        position: relative;
        margin-top: 20px;
    }
    .box::after {
        content:'';
        position: absolute;
        top: -3px; bottom: -3px;
        left: -3px; right: -3px;
        background: linear-gradient(135deg,#000781, #23b7cb);
        border-radius: 30px;
        z-index: -1;
    }

    a {
        display: block;
        height: 30px;
    }
    .home {
        display: flex;
        justify-content: center;
    }
    .utils {
        button {
            display: block;
            margin-top: 20px;
        }
    }
</style>
