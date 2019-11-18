import { cloneDeep, intersection } from 'lodash'
import subWay from './line'
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
        stationList.push(this)
    }
    draw() {
        const { color, name, x, y, textAlign, textBaseline, direction, offset, radius } = this
        const _color = color[0]
        const { length } = color
        if (color.length > 1) {
            const { length } = color
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.arc(x * 60, y * 50, radius * 2, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.drawImage(logo, x * 60 - 10, y * 50 - 10, 20, 20)
            ctx.save()
            ctx.translate(x * 60, y * 50)
            ctx.rotate((Math.PI * 2) / 8 * 5)
            let startAngle = length == 3 ? (Math.PI * 2) / 3 : Math.PI
            let rangAngle = length == 2 ? Math.PI : Math.PI / 3 * 2
            for (let i = 0; i < length; i++) {
                ctx.beginPath()
                ctx.lineCap = "round"
                ctx.lineWidth = radius / 2
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
        const { length } = list
        const startPosition = list[0]
        const {x, y} = startPosition
        const color = startPosition.color
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(x * 60, y * 50)
        ctx.lineWidth = width
        for (let i = 1; i < length; i++) {
            const {x, y} = list[i]
            
            ctx.lineTo(x * 60, y * 50)
            if (name === 'line7' && i === length - 1) {
                ctx.closePath()
            }
            ctx.stroke()
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
        requestAnimationFrame(animate)
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