<template>
    <div class="cd-sub">
        <canvas id="canvas" ref="map"></canvas>
        <div class="right">
            <div>
                <Form>
                    <form-item label="选择起始站">
                        <Select v-model="startVal" placeholder="请选择线路">
                            <Option v-for="(item, index) in sub" :key="index" :label="item.name" :value="item.value" />
                        </Select>
                        <Select v-model="startStation" placeholder="请选择车站">
                            <Option v-for="(item, index) in startList" :key="index" :label="item.name" :value="index" />
                        </Select>                        
                    </form-item>
                    <form-item label="选择结束站">
                        <Select v-model="endVal" placeholder="请选择线路">
                            <Option v-for="(item, index) in sub" :key="index" :label="item.name" :value="item.value" />
                        </Select>
                        <Select v-model="endStation" placeholder="请选择车站">
                            <Option v-for="(item, index) in endList" :key="index" :label="item.name" :value="index" />
                        </Select>                        
                    </form-item>
                    <form-item label="计算最短路线">
                        <Button>计算路程</Button>
                    </form-item>
                </Form>
            </div>
        </div>
    </div> 
</template>

<script>
import subWay from './line'
import {Select, Option, Form, FormItem, Button} from 'element-ui'
let ctx = null
let prev = {x: null, y: null}
const isDraw = []
export default {
    name: 'xg-video',
    components: {Select, Option, Form, FormItem, Button},
    data () {
        return {
            sub: Object.freeze(subWay),
            startVal: '',
            startStation: '',
            startList: [],
            endVal: '',
            endStation: '',
            endList: []
        }
    },
    methods: {
        drawPoint (station, color = 'blue') {
            const [x, y] = station.position
            // ctx.globalCompositeOperation = 'destination-over'
            ctx.fillStyle = color
            ctx.font = '12px sans-serif'
            const {textAlign = 'start', textBaseline = 'middle', direction = 'inherit', offset = [0, 0]} = station
            ctx.textAlign = textAlign
            ctx.textBaseline = textBaseline
            ctx.direction = direction
            ctx.fillText(station.name, x * 60 + offset[0] + (textAlign === 'end' ? (-16) : (16)) , y * 50 + offset[1])
            if (station.next && station.next.length >= 3) {
                ctx.beginPath()
                ctx.arc(x * 60, y * 50, 10, 0, Math.PI * 2, false)
                ctx.closePath()
                ctx.fillStyle = 'blue'
                ctx.fill()
                ctx.fillStyle = '#fff'
                ctx.textBaseline = 'middle'
                ctx.textAlign = 'center'
                ctx.font = '12px sans-serif'
                ctx.fillText('换' , x * 60, y * 50)
            } else {
                ctx.beginPath()
                ctx.arc(x * 60, y * 50, 4, 0, Math.PI * 2, false)
                ctx.closePath()
                ctx.fillStyle = color
                ctx.fill()
            }
            
        },
        drawLine (start, end, color = 'rgb(159, 159, 255)') {
            console.log(color)
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.moveTo(start.x * 60, start.y * 50)
            ctx.lineTo(end.x * 60, end.y * 50)
            ctx.closePath()
            ctx.stroke()
        }
    },
    watch: {
        startVal (e) {
            const {sub, startVal} = this
            this.startStation = ''
            this.startList = Object.freeze(sub[startVal].list)
        },
        endVal (e) {
            const {sub, endVal} = this
            this.endStation = ''
            this.endList = Object.freeze(sub[endVal].list)
        }
    },
    mounted () {
        this.$nextTick(() => {
            const canvas = this.$refs.map
            canvas.width = 1200
            canvas.height = 900
            ctx = this.$refs.map.getContext('2d')
            // 线路一
            Object.keys(subWay).forEach(v => {
                const {lineColor, list, type} = subWay[v]
                const _list = Object.keys(list)
                console.log(type)
                if (type === 0) {
                    const last = list[_list[_list.length - 1]].position
                    console.log(last)
                    prev = {x: last[0], y: last[1]}
                }
                _list.forEach(v => {
                    const station = list[v]
                    const [x, y] = station.position
                    if (prev.x && prev.y) {
                        this.drawLine(prev, {x, y}, lineColor)
                    }
                    prev.x = x
                    prev.y = y
                })
                prev = {x: null, y: null}
            })
            Object.keys(subWay).forEach(v => {
                const {color, list} = subWay[v]
                const _list = Object.keys(list)
                _list.forEach(v => {
                    if (isDraw.includes(v)) {
                        return false
                    }
                    isDraw.push(v)
                    const station = list[v]
                    this.drawPoint(station, color)
                })
            })
        })
    }
}
</script>

<style lang="less" scoped>
    .cd-sub {
        display: flex;
        .right {
            flex: 1;
        }
    }
</style>
