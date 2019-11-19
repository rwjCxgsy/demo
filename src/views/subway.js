import { cloneDeep, intersection } from 'lodash'
import subWay from './line'
import logoURL from './logo'
const logo = new Image();
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

let ctx = null
const offset = {
    x: 0,
    y: 0
}
let prev = { x: null, y: null }

const lineList = []
const stationList = []

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

class SubwayStation {
    constructor(station, origin) {
        const { position, line, id, color, next, name, textAlign = 'start', textBaseline = 'middle', direction = 'ltl', offset = [0, 0] } = station
        const [x, y] = position
        this.x = x
        this.y = y
        this.id = id
        this.color = origin.color
        this.line = [origin]
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
        this.isDraw = false
        stationList.push(this)
    }
    draw() {
        const { name, x, y, textAlign, textBaseline, direction, offset, radius, line, isDraw = false} = this
        if (isDraw) {return}
        this.isDraw = true
        const color = line[0].color
        const { length } = line
        ctx.beginPath()
        ctx.arc(x * 60, y * 50, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fillStyle = color
        ctx.fill()
        // if (length > 1) {
        //     ctx.fillStyle = '#fff'
        //     ctx.beginPath()
        //     ctx.arc(x * 60, y * 50, radius * 2, 0, Math.PI * 2, false)
        //     ctx.fill()
        //     ctx.drawImage(logo, x * 60 - 10, y * 50 - 10, 20, 20)
        //     ctx.save()
        //     ctx.translate(x * 60, y * 50)
        //     ctx.rotate((Math.PI * 2) / 8 * 5)
        //     let startAngle = length == 3 ? (Math.PI * 2) / 3 : Math.PI
        //     let rangAngle = length == 2 ? Math.PI : Math.PI / 3 * 2
        //     for (let i = 0; i < length; i++) {
        //         ctx.beginPath()
        //         ctx.lineCap = "round"
        //         ctx.lineWidth = radius / 2
        //         ctx.strokeStyle = color[i]
        //         ctx.arc(0, 0, radius * 2, startAngle * i, rangAngle * (i + 1), false)
        //         ctx.stroke()
        //     }
        //     ctx.restore()
        // } else {
        //     ctx.beginPath()
        //     ctx.arc(x * 60, y * 50, radius, 0, Math.PI * 2, false)
        //     ctx.closePath()
        //     ctx.fillStyle = color
        //     ctx.fill()
        // }
        ctx.fillStyle = color
        ctx.font = '12px sans-serif'
        ctx.textAlign = textAlign
        ctx.textBaseline = textBaseline
        ctx.direction = direction
        ctx.fillText(name, x * 60 + offset[0] + (textAlign === 'end' ? (-16) : (16)), y * 50 + offset[1])
    }
    updata() {
        const { x, y, radius } = this
        const offsetY = offset.y
        const offsetX = offset.x
        const isMoveUp = ((x * 60 - offsetX) ** 2 + (y * 50 - offsetY) ** 2) <= ((radius + 2) ** 2)
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
        div.style.cssText = `position: fixed; left: ${60 * x + 25}px; top: ${y * 50 + 16}px`
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

class Line {
    constructor(subwayLine) {
        const {line, value, color, list} = subwayLine
        this.name = value
        this.width = 5
        this.line = line
        this.color = color
        this.descriptionContainer = null
        this.stations = []
        this.prevDirection = {}
        for (const station of list) {
            const r = findStation(station, this)
            if (r) {
                this.stations.push(r)
            } else {
                this.stations.push(new SubwayStation(station, this))
            }
        }
    }
    draw() {
        const {name, width, stations: list } = this
        // const direction = ''
        const { length } = list
        const [ startPosition ] = list
        let {x: x1, y: y1} = startPosition
        const color = startPosition.color
        ctx.strokeStyle = color
        ctx.lineWidth = width
        list[0].draw()
        for (let i = 1; i < length; i++) {
            ctx.beginPath()
            const {x: x2, y: y2} = list[i]
            const arc = this.getK(x1, y1, x2, y2)
            ctx.moveTo(x1 * 60 + Math.sin(arc) * 8, y1 * 50 + Math.cos(arc) * 8)
            ctx.lineTo(x2 * 60 - Math.sin(arc) * 8, y2 * 50 - Math.cos(arc) * 8)
            x1 = x2
            y1 = y2
            // if (name === 'line7' && i === length - 1) {
            //     ctx.closePath()
            // }
            ctx.closePath()
            ctx.stroke()
            list[i].draw()
        }
    }
    getK (x1, y1, x2, y2) {
        if (x1 === x2) {
            return y2 > y1 ? 0 : Math.PI
        }
        if (y1 === y2) {
            return x2 < x1 ? (- Math.PI / 2) : Math.PI / 2
        }
        if (y2 < y1) {
            console.log(x1, y1, x2, y2)
            return Math.atan((x2 - x1) / (y2 - y1))
        } else {
            return Math.atan((y2 - y1) / (x2 - x1))
        }
    }
    quadraticCurvePoint (x1, y1, x2, y2, ctx) {
        let {prevDirection} = this
        const bxy = null
        let direction = ''
        const p = {
            lt: 'rb',
            lb: 'rt',
            rb: 'lt',
            rt: 'lb',
            l: 'r',
            r: 'l',
            t: 'b',
            b: 't'
        }
        if (x1 === x2) {
            if (y2 > y1) {
                direction = 'lr'
            } else {
                direction = 'rl'
            }
        } else if (y1 === y2) {
            if (x2 > x1) {
                direction = 'bt'
            } else {
                direction = 'tp'
            }
        } else {
            if (x2 > x1 && y2 > y1) {
                direction = 'ltrb' // 左上到右下
            }
            if (x2 < x1 && y2 < y1) {
                direction = 'rblt' // 右下到左上
            }
            if (x2 > x1 && y2 < y1) {
                direction = 'lbrt' // 左下到右上
            }
            if (x2 < x1 && y2 > y1) {
                direction = 'rtlb' // 右上到左下
            }
            
        }
        if (prevDirection === '') {
            prevDirection = direction
        } else if (prevDirection === 'lr') {
            if (direction === 'tb') {
                bxy = {
                    x: x1 + y2 - y1 ,
                    y: y1 + ((y2 - y1) / 2),
                }
            } else if (direction === 'bt') {
                bxy = {
                    x: x1 + y1 - y2 ,
                    y: y1 - ((y1 - y2) / 2),
                }
            } else {
                bxy = {
                    x: x1 + y2 - y1 ,
                    y: x1 + ((x2 - x1) / 2),
                }
            }
        } else if (prevDirection === 'bt') {

        } else {
            
        }
    }
    updata() {
        // const { line } = this
        // const list = Object.keys(line)
        const {stations: list} = this
        for (let i = 0; i < list.length - 1; i++) {
            const cur = list[i];
            const next = list[i + 1]
            // console.assert(next, next)
            // console.assert(cur, cur)
            if (this.computed(cur, next)) {
                this.width = 8
                break;
            } else {
                this.width = 5
            }
        }
        this.draw()
    }
    computed(start, end) {
        const { x, y } = offset
        const SX = start.x
        const SY = start.y
        const EX = end.x
        const EY = end.y
        const maxX = Math.max(SX, EX) * 60
        const minX = Math.min(SX, EX) * 60
        const maxY = Math.max(SY, EY) * 50
        const minY = Math.min(SY, EY) * 50
        if (x - 4 > maxX || x + 4 < minX || y - 4 > maxY || y + 4 < minY) {
            return false
        }
        const k = ((EY - SY) * 50) / ((EX - SX) * 60)
        let b = SY * 50 - SX * 60 * k
        if (!isFinite(k)) {
            return Math.abs(x - maxX) <= 4
        }
        if (k === 0) {
            return Math.abs(y - maxY) <= 4
        }
        return Math.abs(x * k - y + b) <= 4
    }
}

function launch(canvas) {
    const canvasWidth = 1200
    const canvasHeight = 900
    canvas.addEventListener('mousemove', mousemove)
    function mousemove(e) {
        const { offsetX, offsetY } = e
        offset.x = offsetX
        offset.y = offsetY
    }
    canvas.width = canvasWidth
    canvas.height = canvasHeight
    ctx = canvas.getContext('2d')

    for (const k in subWay) {
        lineList.push(new Line(subWay[k]))
    }
    console.log(lineList, stationList)
    let isDraw = []
    function animate() {
        // requestAnimationFrame(animate)
        ctx.clearRect(0, 0, canvasWidth, canvasHeight)
        for (let line of lineList) {
            line.updata()
        }
        // for (let station of stationList) {
        //     if (!isDraw.includes(station.name)) {
        //         isDraw.push(station.name)
        //         station.updata()
        //     }
        // }
        // isDraw = []
    }
    animate()
}


export function start(canvas) {
    launch(canvas)
}