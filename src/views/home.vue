<template>
    <div class="home">
        <div>
            <router-link to="/cdsub">成都地图</router-link>
            <router-link to="/range">日期选择器</router-link>
            <!-- <router-link to="/scroll">scroll</router-link> -->
            <router-link to="/fall">fall</router-link>
            <button class="light-button" @click="onClick">
                <span class="text">按钮</span>
                <span class="shine" ref="shine"></span>
            </button>
        </div>
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
    methods: {
        onClick (e) {
            const {layerX, offsetX, offsetY, layerY} = e
            console.log(offsetX, offsetY)
            const {shine} = this.$refs;
            (() => {
                const span = document.createElement('span')
                span.className = 'light'
                shine.append(span)
                console.log(document.querySelectorAll('.light'))
                // setTimeout(() => {
                    span.style.left = layerX + 'px'
                    span.style.top = layerY + 'px'
                    span.style.opacity = '0'
                    // span.style.backgroundColor = '#' + Math.random().toString(16).substr(2, 6)
                    span.style.transform = 'translate(-50%, -50%) scale(1)'                
                // }, 10);
                setTimeout(() => {
                    span.remove()
                }, 500);
            })()
        }
    }
}
</script>

<style lang="less">
    a {
        display: block;
        height: 30px;
    }
    .home {
        display: flex;
        justify-content: center;
    }
    .light-button {
        position: relative;
        outline: none;
        border: 0;
        background-color: #1976d2;
        box-shadow: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
        padding: 6px 16px;
        cursor: pointer;
        -webkit-tap-highlight-color:transparent;
        border-radius: 4px;
        .text {
            color: #fff;
            font-size: 18px;
            z-index: -1;
        }
        .shine {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: inherit;
            pointer-events: none;
            overflow: hidden;
            z-index: 2;
            .light {
                position: absolute;
                display: block;
                width: 200px;
                height: 200px;
                background-color: rgba(255, 255, 255, 0.5);
                opacity: 1;
                transform: translate(-50%, -50%) scale(0);
                transition: all 0.5s linear;
                border-radius: 50%;
            }
        }
    }
</style>
