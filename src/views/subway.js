// import { cloneDeep, intersection } from 'lodash'
import {list as subWay, lineColor} from './line copy'
import {colorMinix} from '@/utils'
import logoURL from './logo'

console.log(colorMinix("#ff00cc", '#00ffdd'))
const logo = new Image();
const GX = 60
const GY = 50
!(async () => {
    function load () {
        return new Promise(r => {
            logo.src = logoURL
            logo.onload = () => {
                r()
            }
        })
    }
    await load()
})()

let lineCTX = null
let stationCTX = null
const offset = {
    x: 0,
    y: 0
}
let prev = { x: null, y: null }

const lineList = []
const stationList = []
// let drawes = []

const findStation = (station, line) => {
    for (const item of stationList) {
        const { id } = station
        if (item.id === id) {
            item.line.push(line)
            return item
        }
    }
    return null
}
let drawK = 1
class SubwayStation {
    constructor(station) {
        const { position, line, id, next, name, textAlign = 'start', textBaseline = 'middle', direction = 'ltl', offset = [0, 0] } = station
        const [x, y] = position
        this.x = x
        this.y = y
        this.id = id
        this.color = origin.color
        this.line = line
        this.colors = line.map(v => lineColor[v])
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
        stationList.push(this)
    }
    draw() {
        const { name, x, y, colors, textAlign, textBaseline, direction, offset, radius, line, isDraw = false} = this
        const color = colorMinix(...colors)
        console.log(name, color)
        stationCTX.beginPath()
        stationCTX.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
        stationCTX.closePath()
        stationCTX.fillStyle = color
        stationCTX.fill()
        stationCTX.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
        stationCTX.lineWidth = '2'
        stationCTX.strokeStyle = '#fff'
        stationCTX.stroke()


        // if (length > 1) {
        //     stationCTX.fillStyle = '#fff'
        //     stationCTX.beginPath()
        //     stationCTX.arc(x * GX, y * GY, radius * 2, 0, Math.PI * 2, false)
        //     stationCTX.fill()
        //     stationCTX.drawImage(logo, x * GX - 10, y * GY - 10, 20, 20)
        //     stationCTX.save()
        //     stationCTX.translate(x * GX, y * GY)
        //     stationCTX.rotate((Math.PI * 2) / 8 * 5)
        //     let startAngle = length == 3 ? (Math.PI * 2) / 3 : Math.PI
        //     let rangAngle = length == 2 ? Math.PI : Math.PI / 3 * 2
        //     for (let i = 0; i < length; i++) {
        //         stationCTX.beginPath()
        //         stationCTX.lineCap = "round"
        //         stationCTX.lineWidth = radius / 2
        //         stationCTX.strokeStyle = color[i]
        //         stationCTX.arc(0, 0, radius * 2, startAngle * i, rangAngle * (i + 1), false)
        //         stationCTX.stroke()
        //     }
        //     stationCTX.restore()
        // } else {
        //     stationCTX.beginPath()
        //     stationCTX.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
        //     stationCTX.closePath()
        //     stationCTX.fillStyle = color
        //     stationCTX.fill()

        //     stationCTX.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
        //     stationCTX.lineWidth = '2'
        //     stationCTX.strokeStyle = '#fff'
        //     stationCTX.stroke()
        // }
        stationCTX.font = '12px sans-serif'
        stationCTX.textAlign = textAlign
        stationCTX.textBaseline = textBaseline
        stationCTX.direction = direction
        stationCTX.fillText(drawK++, x * GX + offset[0] + (textAlign === 'end' ? (-16) : (16)), y * GY + offset[1])
        stationCTX.restore()
    }
    updata() {
        const { x, y, radius } = this
        const offsetY = offset.y
        const offsetX = offset.x
        const isMoveUp = ((x * GX - offsetX) ** 2 + (y * GY - offsetY) ** 2) <= ((radius + 2) ** 2)
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
    showDescription() {
        const { x, y, name, line, next, color } = this
        let div = this.descriptionContainer = document.createElement('div')
        div.classList.add('station-des')
        div.style.cssText = `position: fixed; left: ${GX * x + 25}px; top: ${y * GY + 16}px`
        const nextStation = () => {
            let result = ''
            for (const iterator of next) {
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
                    <span>${line.length === 1 ? line[0] : line.length === 2 ? (line[0] + '号线和' + line[1] + '号线换乘线') : (line[0] + '号线、' + line[1] + '号线和' + line[2] + '号线换乘线')}</span>
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

// class Line {
//     constructor(subwayLine) {
//         const {line, value, color, list} = subwayLine
//         this.name = value
//         this.width = 5
//         this.line = line
//         this.color = color
//         this.descriptionContainer = null
//         this.stations = []
//         this.prevDirection = {}
//         // this.active = false
//         for (const station of list) {
//             const r = findStation(station, this)
//             if (r) {
//                 this.stations.push(r)
//             } else {
//                 this.stations.push(new SubwayStation(station, this))
//             }
//         }
//     }
//     draw() {
//         const {name, width, stations: list } = this
//         console.log(this)
//         // const direction = ''
//         const { length } = list
//         let [ ins ] = list
//         let {x: x1, y: y1} = ins
//         const {color } = this
//         console.log(name, color)
//         lineCTX.strokeStyle = color
//         lineCTX.lineWidth = width
//         lineCTX.lineCap = "round"
//         ins.draw()
//         for (let i = 0; i < length; i++) {
//             const {x: x2, y: y2} = ins = list[i]
//             lineCTX.beginPath()
//             lineCTX.moveTo(x1 * GX, y1 * GY)
//             lineCTX.lineTo(x2 * GX, y2 * GY)
//             x1 = x2
//             y1 = y2
//             if (name === 'line7' && i === length - 1) {
//                 x2 = list[0].x
//                 y2 = list[0].y
//                 lineCTX.moveTo(x1 * GX, y1 * GY)
//                 lineCTX.lineTo(x2 * GX, y2 * GY)
//             }
//             lineCTX.stroke()  
//             // ctx.closePath()
//             ins.updata()
//         }
//     }
//     quadraticCurvePoint (x1, y1, x2, y2, ctx) {
//         let {prevDirection} = this
//         const bxy = null
//         let direction = ''
//         const p = {
//             lt: 'rb',
//             lb: 'rt',
//             rb: 'lt',
//             rt: 'lb',
//             l: 'r',
//             r: 'l',
//             t: 'b',
//             b: 't'
//         }
//         if (x1 === x2) {
//             if (y2 > y1) {
//                 direction = 'lr'
//             } else {
//                 direction = 'rl'
//             }
//         } else if (y1 === y2) {
//             if (x2 > x1) {
//                 direction = 'bt'
//             } else {
//                 direction = 'tp'
//             }
//         } else {
//             if (x2 > x1 && y2 > y1) {
//                 direction = 'ltrb' // 左上到右下
//             }
//             if (x2 < x1 && y2 < y1) {
//                 direction = 'rblt' // 右下到左上
//             }
//             if (x2 > x1 && y2 < y1) {
//                 direction = 'lbrt' // 左下到右上
//             }
//             if (x2 < x1 && y2 > y1) {
//                 direction = 'rtlb' // 右上到左下
//             }
            
//         }
//         if (prevDirection === '') {
//             prevDirection = direction
//         } else if (prevDirection === 'lr') {
//             if (direction === 'tb') {
//                 bxy = {
//                     x: x1 + y2 - y1 ,
//                     y: y1 + ((y2 - y1) / 2),
//                 }
//             } else if (direction === 'bt') {
//                 bxy = {
//                     x: x1 + y1 - y2 ,
//                     y: y1 - ((y1 - y2) / 2),
//                 }
//             } else {
//                 bxy = {
//                     x: x1 + y2 - y1 ,
//                     y: x1 + ((x2 - x1) / 2),
//                 }
//             }
//         } else if (prevDirection === 'bt') {

//         } else {
            
//         }
//     }
//     updata() {
//         // const { line } = this
//         // const list = Object.keys(line)
//         const {stations: list} = this
//         for (let i = 0; i < list.length - 1; i++) {
//             const cur = list[i];
//             const next = list[i + 1]
//             if (this.computed(cur, next)) {
//                 if (this.width === 8) {
//                     break
//                 }
//                 this.width += 1
//                 break;
//             } else {
//                 if (this.width === 5) {
//                     break
//                 }
//                 this.width -= 1
//             }
//         }
//         this.draw()
//     }
//     computed(start, end) {
//         const { x, y } = offset
//         const SX = start.x
//         const SY = start.y
//         const EX = end.x
//         const EY = end.y
//         const maxX = Math.max(SX, EX) * GX
//         const minX = Math.min(SX, EX) * GX
//         const maxY = Math.max(SY, EY) * GY
//         const minY = Math.min(SY, EY) * GY
//         if (x - 4 > maxX || x + 4 < minX || y - 4 > maxY || y + 4 < minY) {
//             return false
//         }
//         const k = ((EY - SY) * GY) / ((EX - SX) * GX)
//         let b = SY * GY - SX * GX * k
//         if (!isFinite(k)) {
//             return Math.abs(x - maxX) <= 4
//         }
//         if (k === 0) {
//             return Math.abs(y - maxY) <= 4
//         }
//         return Math.abs(x * k - y + b) <= 4
//     }
// }


function launch(line, station) {
    const canvasWidth = 1200
    const canvasHeight = 900
    station.addEventListener('mousemove', mousemove)
    function mousemove(e) {
        const { offsetX, offsetY } = e
        offset.x = offsetX
        offset.y = offsetY
    }
    line.width = canvasWidth
    line.height = canvasHeight
    station.width = canvasWidth
    station.height = canvasHeight

    lineCTX = line.getContext('2d')
    stationCTX = station.getContext('2d')
    console.log(subWay)
    for (const k in subWay) {
        lineList.push(new SubwayStation(subWay[k]))
    }
    console.log(lineList)
    function animate() {
        // requestAnimationFrame(animate)
        lineCTX.clearRect(0, 0, canvasWidth, canvasHeight)
        stationCTX.clearRect(0, 0, canvasWidth, canvasHeight)
        for (let line of lineList) {
            line.updata()
        }
    }
    animate()
}


export function start(line, station) {
    launch(line, station)
}