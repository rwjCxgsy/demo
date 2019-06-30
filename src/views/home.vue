<template>
    <div class="home">
        <router-link to="/cdsub">成都地图</router-link>
        <router-link to="/range">日期选择器</router-link>
    </div>
</template>

<script>
import Test from './test'
export default {
    name: 'home',
    components: {Test},
    data () {
        return {
            show: false
        }
    },
    created () {
        class Watcher {
            constructor (data) {
                this.$data = data
                Object.keys(data).forEach(key => {
                    this.convert(key, data[key])
                })
            }
            convert (key, value) {
                this.defineReactive(this.data, key, value)
            }
            defineReactive (Object, key, value) {
                let dep = new Dep()
                var childObj = observe(value);
                Object.definePrototy(data, key, {
                    enuselfrable: true, // 可枚举
                    configurable: false, // 不能再define
                    get(){
                        if (Dep.target) {
                            dep.depend();
                        }
                        return value;
                    },
                    set(newVal) {
                        if (newVal === value) {
                            return;
                        }
                        value = newVal;
                        // 新的值是object的话，进行监听
                        childObj = observe(newVal);
                        // 通知订阅者
                        dep.notify();
                    }
                })
            }
        }
        function observe(value, vm) {
            if (!value || typeof value !== 'object') {
                return;
            }
            return new Observer(value);
        }
    },
    mounted () {
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
