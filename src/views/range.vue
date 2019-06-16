<template>
    <div class="range">
        <button @click="() => {show = true}">打开</button>
        <Range v-model="show" :date-range="dateRange" @change="onChange" may-day="301"/>
        <p>选择了</p>
        <ul>
            <li v-for="(item, i) in list" :key="i">{{item}}</li>
        </ul>
    </div>
</template>

<script>
import Range from 'vue-time-range-picker'
export default {
    name: 'range',
    components: {Range},
    data () {
        return {
            show: false,
            list: [],
            dateRange: []
        }
    },
    methods: {
        onChange (data) {
            console.log(data)
            this.list = data.list
        }
    }
}
</script>

<style lang="less" scoped>
    .range {
        text-align: center;
    }
</style>
