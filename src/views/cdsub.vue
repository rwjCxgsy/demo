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
                            <Option v-for="(item, index) in startList" :disabled="index === endStation" :key="index" :label="item.name" :value="index" />
                        </Select>                        
                    </form-item>
                    <form-item label="选择结束站">
                        <Select v-model="endVal" placeholder="请选择线路">
                            <Option v-for="(item, index) in sub" :key="index" :label="item.name" :value="item.value" />
                        </Select>
                        <Select v-model="endStation" placeholder="请选择车站">
                            <Option v-for="(item, index) in endList" :disabled="index === startStation" :key="index" :label="item.name" :value="index" />
                        </Select>                        
                    </form-item>
                    <form-item label="计算最短路线">
                        <Button type="primary" @click="planning" :disabled="isplan">计算路程</Button>
                    </form-item>
                    <form-item label="最短路线"/>
                    <div class="step-map">
                        <div v-for="(item, index) in line" :key="index">
                            <i v-if="index === 0">起</i>
                            <i v-if="index === line.length - 1">始</i>
                            <i v-if="item.isChange">转</i>
                            <strong>{{index+1}}</strong>
                            <span>{{item.name}}</span>
                            <p>{{item.des}}</p>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    </div> 
</template>

<script>
import subWay from './line'
import {Select, Option, Form, FormItem, Button, Message} from 'element-ui'
import {cloneDeep, intersection} from 'lodash'
console.log(cloneDeep)
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
            endList: [],
            minStation: []
        }
    },
    computed: {
        line () {
            const {minStation} = this
            if (!minStation.length) {
                return []
            }
            const newMinStation = cloneDeep(minStation)
            console.log(newMinStation)
            let startStation = newMinStation[0].line
            let nextStation = newMinStation[1].line
            let currentLine = intersection(startStation, nextStation)[0]
            newMinStation[0].start = currentLine
            for (let index = 0; index < newMinStation.length - 1; index++) {
                const element = newMinStation[index];
                const nextElement = newMinStation[index + 1];
                const some = intersection(element.line, nextElement.line)[0]
                if (some !== currentLine) {
                    element.des = `${currentLine}号线换成${some}号线`
                    element.changeLine = [currentLine, some]
                    element.isChange = true
                    currentLine = some
                } else {
                    element.isChange = false
                }
            }
            return newMinStation
        },
        isplan () {
            const {startVal, endVal, startStation, endStation} = this
            if (!(startStation && endStation)) {
                return true
            }
            if (startStation === endStation) {
                return true
            }
            return false
        }
    },
    methods: {
        planning () {
            console.time('最短站数')
            const {startVal, endVal, startStation, endStation} = this
            let start = subWay[startVal].list[startStation]
            let end = subWay[endVal].list[endStation]
            let min = 99999
            const stepList = new Set()
            let k = 1
            const allStepsList = {}
            const find = (station) => {
                let result = null
                for (const key in subWay) {
                    if (subWay.hasOwnProperty(key)) {
                        const element = subWay[key];
                        const _result = element.list[station]
                        if (_result) {
                            result = _result
                            break
                        }
                    }
                }
                if (!result) {
                    console.log(station)
                }
                return result
            }
            function jisuan (station, step) {
                let next = null
                // if (stepList.size > min) {
                //     return false
                // }
                if (station.name === end.name) {
                    if (stepList.size < min) {
                        min = stepList.size
                    }
                    allStepsList[++k] = [...stepList]
                    return false
                }
                let {length} = station.next
                for (let i = 0; i < length; i++) {
                    let n = station.next[i]
                    next = find(n)
                    if (!stepList.has(next)) {
                        stepList.add(next)
                        jisuan(next, step + 1)
                        stepList.delete(next)
                    }
                }
            }
            stepList.add(start)
            jisuan(start, 0)
            console.log(allStepsList)
            console.timeEnd('最短站数')
            for (const key in allStepsList) {
                if (allStepsList.hasOwnProperty(key)) {
                    const element = allStepsList[key];
                    if (element.length === min) {
                        this.minStation = element
                        break
                    }
                }
            }
            // this.num = min
        },
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
            const {sub} = this
            this.startStation = ''
            this.startList = Object.freeze(sub[e].list)
        },
        endVal (e) {
            const {sub} = this
            this.endStation = ''
            this.endList = Object.freeze(sub[e].list)
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
    .step-map {
        height: 350px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: flex-start;
        div {
            height: 35px;
            display: flex;
            align-items: center;
            position: relative;
            i {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(0, -50%);
                font-style: normal;
                border-radius: 50%;
                font-size: 14px;
            }
            strong {
                margin-left: 20px;
                display: inline-block;
                width: 20px;
                text-align: right;
                margin-right: 10px;
            }
            span {
                display: inline-block;
                min-width: 120px;
            }
            p {
                color: red;
                font-size: 12px;
            }    
        }

    }
</style>
