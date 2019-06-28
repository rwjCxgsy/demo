<template>
    <div class="cd-sub">
        <canvas id="canvas" ref="map"></canvas>
        <div class="right">
            <div>
                <Form>
                    <form-item label="选择起始站">
                        <Select v-model="startLine" placeholder="请选择线开始线路">
                            <Option v-for="(item, index) in sub" :key="index" :label="item.name" :value="index" />
                        </Select>  
                        <Select no-data-text="请选择开始站" v-model="startStation" placeholder="请选择车站">
                            <Option v-for="(item, index) in startList" :disabled="index === endStation" :key="index" :label="item.name" :value="index" />
                        </Select>                        
                    </form-item>
                    <form-item label="选择结束站">
                        <Select v-model="endLine" placeholder="请选择线结束线路">
                            <Option v-for="(item, index) in sub" :key="index" :label="item.name" :value="index" />
                        </Select>  
                        <Select no-data-text="请选择结束站" v-model="endStation" placeholder="请选择车站">
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
import subWay from './line.bak'
// const subWay = () => import('./line.bak')
// console.log(subWay)
import {Select, Option, Form, FormItem, Button, Message} from 'element-ui'
import {cloneDeep, intersection} from 'lodash'
import {throttle, debounce} from 'lodash'
let ctx = null
let prev = {x: null, y: null}
export default {
    name: 'cd-subWay',
    components: {Select, Option, Form, FormItem, Button},
    data () {
        return {
            sub: Object.freeze(subWay),
            startLine: '',
            startStation: '',
            startList: [],
            endLine: '',
            endStation: '',
            endList: [],
            minStation: {},
            mastMinChange: [],
            mastMinStation: []
        }
    },
    computed: {
        isplan () {
            const {startStation, endStation} = this
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
            const {startStation, endStation, startList, endList} = this
            let start = startList[startStation]
            let end = endList[endStation]
            let min = 99999
            const stepList = new Set()
            let k = 1
            const allStepsList = {}
            const find = (station) => {
                let result = null
                for (const key in subWay) {
                    if (subWay.hasOwnProperty(key)) {
                        const element = subWay[key].list;
                        const _result = element[station]
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
            let temp = []
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
                    temp = scheme
                }
            }
            this.mastMinChange = Object.freeze(temp)
            console.timeEnd('最短站数')
        },
        startLine (e) {
            this.startStation = ''
            this.startList = Object.freeze(subWay[e].list)
        },
        endLine (e) {
            this.endStation = ''
            this.endList = Object.freeze(subWay[e].list)
        }
    },
    mounted () {
        this.$nextTick(() => {
            const canvas = this.$refs.map
            const offset = {x: 0, y: 0}
            canvas.addEventListener('mousemove', mousemove)
            function mousemove (e) {
                const {offsetX, offsetY} = e
                offset.x = offsetX
                offset.y = offsetY
            }
            const canvasWidth = 1200
            const canvasHeight = 900
            canvas.width = canvasWidth
            canvas.height = canvasHeight
            ctx = this.$refs.map.getContext('2d')
            class Point {
                constructor ({position, line, color, next, name, textAlign = 'start', textBaseline = 'middle', direction = 'ltl', offset = [0, 0]}) {
                    const [x, y] = position
                    this.x = x
                    this.y = y
                    this.color = color
                    this.line = line
                    this.next = next
                    this.name = name
                    this.textAlign = textAlign
                    this.textBaseline = textBaseline
                    this.direction = direction
                    this.offset = offset
                    this.radius = 6
                    this.isActive = false
                    this.isSelected = false
                    this.descriptionContainer = null
                }
                draw () {
                    const {color, name, x, y, textAlign, textBaseline, direction, offset, radius} = this
                    const _color = color[0]
                    const {length} = color
                    if (color.length > 1) {
                        const {length} = color
                        ctx.fillStyle = '#fff'
                        ctx.beginPath()
                        ctx.arc(x * 60, y * 50, radius * 2, 0, Math.PI * 2, false)
                        ctx.fill()
                        ctx.fillStyle = 'blue'
                        ctx.textBaseline = 'middle'
                        ctx.textAlign = 'center'
                        ctx.font = '12px sans-serif'
                        ctx.fillText('换' , x * 60, y * 50)
                        ctx.save()
                        ctx.translate(x * 60, y * 50)
                        ctx.rotate((Math.PI * 2) / 8 * 5)
                        let startAngle = length == 3 ? (Math.PI * 2) / 3 : Math.PI
                        let rangAngle = length == 2 ? Math.PI : Math.PI / 3 * 2
                        for (let i = 0; i < length; i++) {
                            ctx.beginPath()
                            ctx.lineCap = "round"
                            ctx.lineWidth = radius
                            ctx.strokeStyle = color[i]
                            ctx.arc(0, 0, radius * 2, startAngle * i, rangAngle * (i + 1), false)
                            ctx.stroke()
                        }
                        ctx.restore()
                    } else {
                        ctx.beginPath()
                        ctx.arc(x * 60, y * 50, radius, 0, Math.PI * 2, false)
                        ctx.closePath()
                        ctx.fillStyle = _color
                        ctx.fill()
                    }
                    ctx.fillStyle = _color
                    ctx.font = '12px sans-serif'
                    ctx.textAlign = textAlign
                    ctx.textBaseline = textBaseline
                    ctx.direction = direction
                    ctx.fillText(name, x * 60 + offset[0] + (textAlign === 'end' ? (-16) : (16)) , y * 50 + offset[1])
                }
                updata () {
                    const {x, y , radius} = this
                    const offsetY = offset.y
                    const offsetX = offset.x
                    const isMoveUp = ((x * 60 - offsetX)**2 + (y * 50 - offsetY)**2) <= ((radius+2) ** 2)
                    if (isMoveUp) {
                        if (this.radius < 8) {
                            this.radius += 1
                        }
                        if (!this.descriptionContainer) {
                            this.showDescription()
                        }
                    } else {
                        if (this.radius > 6) {
                            this.radius -= 1
                        }
                        if (this.descriptionContainer) {
                            this.descriptionContainer.remove()
                            this.descriptionContainer = null
                        }
                    }
                    this.draw()
                }
                showDescription () {
                    const {x, y, name, line, next} = this
                    let div = this.descriptionContainer = document.createElement('div')
                    div.classList.add('station-des')
                    div.style.cssText = `position: fixed; left: ${60 * x + 25}px; top: ${y * 50 + 16}px`
                    const nextStation = () => {
                        let result = ''
                        outer: for (const iterator of next) {
                            inner: for (const key in subWay) {
                                if (subWay.hasOwnProperty(key)) {
                                    const element = subWay[key];
                                    if (element.list[iterator]) {
                                        result += element.list[iterator].name
                                        break inner
                                    }
                                }
                            }
                            result += '、'
                        }
                        result = result.substring(0, result.length - 1) 
                        return result
                    }
                    div.innerHTML = `
                        <div>
                            <div>
                                <strong>名称：</strong>
                                <span>${name}</span>
                            </div>
                            <div>
                                <strong>线路：</strong>
                                <span>${line.length === 1 ? line[0] : line.length === 2 ? (line[0] + '号线和' + line[1] + '号线换乘线') : (line[0] + '号线、' + line[1] + '号线和' + line[2] + '号线换乘线') }</span>
                            </div>
                            <div>
                                <strong>相邻站：</strong>
                                <span>${nextStation()}</span>
                            </div>
                        </div>
                    `
                    document.body.append(div)
                }
            }

            class Line {
                constructor (lineNumber, line) {
                    this.lineNumber = lineNumber
                    this.line = line
                    this.lineWidth = 4
                }
                draw () {
                    const {line, lineNumber, lineWidth} = this
                    const list = Object.keys(line)
                    const {length} = list
                    const startPosition = line[list[0]]
                    const [x, y] = startPosition.position
                    const color = startPosition.color[0]
                    ctx.strokeStyle = color
                    ctx.beginPath()
                    ctx.moveTo(x * 60, y * 50)
                    ctx.lineWidth = lineWidth
                    for (let i = 1; i < length; i++) {
                        const [x, y] = line[list[i]].position
                        ctx.lineTo(x * 60, y * 50)
                        if (lineNumber === 'line7' && i === length - 1) {
                            ctx.closePath()
                        }
                        ctx.stroke()
                    }
                }
            }
            const stationList = new Set()
            const lineList = new Set()
            for (const lineKey in subWay) {
                const _line = subWay[lineKey].list
                lineList.add(new Line(lineKey, _line))
                for (const stationKey in _line) {
                    const _station = _line[stationKey]
                    stationList.add(new Point(_station))
                }
            }
            let isDraw = []
            function animate () {
                requestAnimationFrame(animate)
                ctx.clearRect(0, 0, canvasWidth, canvasHeight)
                for (let line of lineList) {
                    line.draw()
                }
                for (let station of stationList) {
                    if (!isDraw.includes(station.name)) {
                        isDraw.push(station.name)
                        station.updata()
                    }
                }
                isDraw = []
            }
            animate()
        })
    }
}
</script>

<style lang="less">
    .station-des {
        position: fixed;
        background-color: #fff;
        border-radius: 4px;
        padding: 10px;
        box-shadow: 0 1px 6px 0 rgba(32,33,36,0.28);
        strong {
            font-size: 12px;
        }
        span {
            font-size: 12px;
        }
    }
    .cd-sub {
        height: 100vh;
        background-color: rgb(248, 248, 248);
        display: flex;
        align-items: center;
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
