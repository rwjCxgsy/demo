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
                    <div class="map-show">
                        <div>
                            <form-item label="最短路线"/>
                            <div class="step-map">
                                <div v-for="(item, index) in mastMinStation" :key="index">
                                    <i v-if="index === 0">起</i>
                                    <i v-if="index === mastMinStation.length - 1">始</i>
                                    <i v-if="item.isChange">转</i>
                                    <div :style="lineStyle(item.changeLine)">
                                        <strong>{{index+1}}</strong>
                                    </div>
                                    <span>{{item.name}}</span>
                                    <p>{{item.des}}</p>
                                </div>
                            </div>                            
                        </div>
                        <div>
                            <form-item label="最少换乘"/>
                            <div class="step-map">
                                <div v-for="(item, index) in mastMinChange" :key="index">
                                    <i v-if="index === 0">起</i>
                                    <i v-if="index === mastMinChange.length - 1">始</i>
                                    <i v-if="item.isChange">转</i>
                                    <div :style="lineStyle(item.changeLine)">
                                        <strong>{{index+1}}</strong>
                                    </div>
                                    <span>{{item.name}}</span>
                                    <p>{{item.des}}</p>
                                </div>
                            </div>                            
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
import { debuglog } from 'util';
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
            minStation: {},
            mastMinChange: [],
            mastMinStation: []
        }
    },
    computed: {
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
        lineStyle (line) {
            console.log(line)
            const {length} = line
            const findColor = (line) => {
                return subWay['line' + line].color
            }
            if (length === 1) {
                return {
                    borderTop: '10px solid ' + findColor(line[0]),
                    borderBottom: '10px solid ' + findColor(line[0]),
                }
            } else if (length === 2) {
                return {
                    borderTop: '10px solid ' + findColor(line[0]),
                    borderBottom: '10px solid ' + findColor(line[1]),
                }
            } else {
                return {
                    borderTop: '10px solid ' + findColor(line[0]),
                    borderBottom: '10px solid ' + findColor(line[1]),
                }
            }
            return {}
        },
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
            k = 1
            let temp = {}
            for (const key in allStepsList) {
                if (allStepsList.hasOwnProperty(key)) {
                    const element = allStepsList[key];
                    if (element.length === min) {
                        temp[k++] = element
                    }
                }
            }
            this.minStation = temp
            // this.num = min
        },
        drawPoint (station, color) {
            let _color = color[0]
            const [x, y] = station.position
            ctx.lineWidth = 2
            // ctx.globalCompositeOperation = 'destination-over'
            if (color.length > 1) {
                const {length} = color
                ctx.save()
                ctx.translate(x * 60, y * 50)
                ctx.rotate((Math.PI * 2) / 8 * 5)
                let startAngle = length == 3 ? (Math.PI * 2) / 3 : Math.PI
                let rangAngle = length == 2 ? Math.PI : Math.PI / 3 * 2
                for (let i = 0; i < length; i++) {
                    ctx.beginPath()
                    ctx.lineWidth = 4
                    ctx.strokeStyle = color[i]
                    ctx.arc(0, 0, 12, startAngle * i, rangAngle * (i + 1), false)
                    ctx.stroke()
                }
                ctx.restore()
                // ctx.fillStyle = _color
                ctx.fillStyle = '#fff'
                ctx.arc(x * 60, y * 50, 10, 0, Math.PI * 2, false)
                ctx.fill()
                ctx.fillStyle = 'blue'
                ctx.textBaseline = 'middle'
                ctx.textAlign = 'center'
                ctx.font = '12px sans-serif'
                ctx.fillText('换' , x * 60, y * 50)
            } else {
                ctx.beginPath()
                ctx.arc(x * 60, y * 50, 4, 0, Math.PI * 2, false)
                ctx.closePath()
                ctx.fillStyle = _color
                ctx.fill()
            }
            ctx.fillStyle = _color
            ctx.font = '12px sans-serif'
            const {textAlign = 'start', textBaseline = 'middle', direction = 'inherit', offset = [0, 0]} = station
            ctx.textAlign = textAlign
            ctx.textBaseline = textBaseline
            ctx.direction = direction
            ctx.fillText(station.name, x * 60 + offset[0] + (textAlign === 'end' ? (-16) : (16)) , y * 50 + offset[1])
            
        },
        drawLine (start, end, color = 'rgb(159, 159, 255)') {
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.lineWidth = 4
            ctx.moveTo(start.x * 60, start.y * 50)
            ctx.lineTo(end.x * 60, end.y * 50)
            ctx.closePath()
            ctx.stroke()
        },
        disposeData (value) {
            const copyValue = {}
            for (const key in value) {
                let newMinStation = copyValue[key] = cloneDeep(value[key])
                let startStation = newMinStation[0].line
                let nextStation = newMinStation[1].line
                let currentLine = intersection(startStation, nextStation)[0]
                newMinStation[0].start = currentLine
                for (let index = 0; index < newMinStation.length; index++) {
                    const element = newMinStation[index];
                    let nextElement = newMinStation[index + 1];
                    if (!nextElement) {
                        nextElement = element
                    }
                    const some = intersection(element.line, nextElement.line)[0]
                    if (some !== currentLine) {
                        element.des = `${currentLine}号线换成${some}号线`
                        element.changeLine = [currentLine, some]
                        element.isChange = true
                        currentLine = some
                    } else {
                        element.changeLine = [currentLine]
                        element.isChange = false
                    }
                }
            }
            return copyValue
        }
    },
    watch: {
        minStation (value) {
            const copyValue = this.disposeData(value)
            const {length} = Object.keys(copyValue)
            if (length === 1) {
                this.mastMinChange = this.mastMinStation = Object.freeze(copyValue[1])
                return false
            }
            this.mastMinStation = copyValue[1]
            let minC = 9999
            console.log(length)
            for (const key in copyValue) {
                const scheme = copyValue[key]
                let c = 0
                const {length} = scheme
                for (let i = 0; i < length; i++) {
                    if (scheme[i].isChange) {
                        c++
                    }
                }
                if (c < minC) {
                    minC = c
                }
            }
            console.log(minC)
            for (const key in copyValue) {
                const scheme = copyValue[key]
                let c = 0
                const {length} = scheme
                for (let i = 0; i < length; i++) {
                    if (scheme[i].isChange) {
                        c++
                    }
                }
                if (c === minC) {
                    this.mastMinChange = Object.freeze(scheme)
                    break
                }
            }
        },
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
    created () {
        console.time('map')
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
                    let _color = []
                    list[v].line.forEach(v => {
                        _color.push(subWay['line' + v].color)
                    })
                    this.drawPoint(station, _color)
                })
            })
            console.timeEnd('map')
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
    .map-show {
        display: flex;
        &>div {
            width: 50%;
        }
    }
    .step-map {
        height: 450px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: flex-start;
        align-content: flex-start;
        &>div {
            height: 45px;
            margin-right: 20px;
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
            div {
                display: inline-block;
                margin-left: 20px;
                width: 20px;
                height: 0;
                border-radius: 50%;
                position: relative;
                strong {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    color: #fff;
                    font-size: 14px;
                }
            }
            span {
                display: inline-block;
                min-width: 100px;
                margin-left: 10px;
            }
            p {
                color: red;
                font-size: 12px;
            }    
        }

    }
</style>
