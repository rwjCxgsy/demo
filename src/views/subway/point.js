import { lineColor } from './date'
import {colorMinix} from '@/utils'
import Segment from './line'

const logo = new Image();
import logoURL from '../logo'
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

let prepStation = null

let k = 1
class SubwayStation {
    constructor(option, ctx, rootOrigin) {
        const { position, line, id, next, name, textAlign = 'start', textBaseline = 'middle', direction = 'ltl', offset = [0, 0] } = option
        const [x, y] = position
        this.key = k++
        this.root = rootOrigin
        this.ctx = ctx
        this.x = x
        this.y = y
        this.id = id
        // this.color = line.map(v => lineColor[v])
        this.line = line
        this.colors = line.map(v => lineColor[v])
        this.next = next
        this.near = Object.create(null)
        next.forEach(v => {
            this.near[v] = null
        })
        delete this.next
        this.name = name
        this.textAlign = textAlign
        this.textBaseline = textBaseline
        this.direction = direction
        this.offset = offset
        this.radius = 6
        // this.isActive = false
        // this.isSelected = false
        this.descriptionContainer = null
        this.segments = {}
        // stationList.push(this)
    }
    draw() {
        const {root, ctx, name, x, y, colors, textAlign, textBaseline, direction, offset, radius, line, isDraw = false} = this
        const color = colorMinix(...colors)
        const {GX, GY} = root
        ctx.fillStyle = color
        const {length} = line
        if (length > 1) {
            // ctx.beginPath()
            // ctx.arc(x * GX, y * GY, radius * 2, 0, Math.PI * 2, false)
            // ctx.fill()
            ctx.drawImage(logo, x * GX - 10, y * GY - 10, 20, 20)
            ctx.save()
            ctx.translate(x * GX, y * GY)
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
            ctx.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
            ctx.closePath()
            ctx.fill()

            ctx.arc(x * GX, y * GY, radius, 0, Math.PI * 2, false)
            ctx.lineWidth = '2'
            ctx.strokeStyle = '#fff'
            ctx.stroke()
        }
        ctx.font = '12px sans-serif'
        ctx.textAlign = textAlign
        ctx.textBaseline = textBaseline
        ctx.direction = direction
        ctx.fillText(name, x * GX + offset[0] + (textAlign === 'end' ? (-16) : (16)), y * GY + offset[1])
        ctx.restore()
        // if (prepStation) {
        //     new Segment(prepStation, this)
        // } else {
        //     prepStation = this
        // }
    }
    updata() {
        const { x, y, radius, root } = this
        const {offset, GX, GY, stationCTX} = root
        const dom = stationCTX.canvas
        const offsetY = offset.y
        const offsetX = offset.x
        const isMoveUp = ((x * GX - offsetX) ** 2 + (y * GY - offsetY) ** 2) <= ((radius + 2) ** 2)
        if (isMoveUp) {
            // dom.style.cursor = 'pointer'
            this.pointer = true
            if (this.radius < 8) {
                this.radius += 1
            }
            if (!this.descriptionContainer) {
                this.showDescription()
            }
        } else {
            this.pointer = false
            // dom.style.cursor = 'default'
            if (this.radius > 6) {
                this.radius -= 1
            }
            if (this.descriptionContainer) {
                this.descriptionContainer.remove()
                this.descriptionContainer = null
            }
        }
        // console.log(container)
        this.draw()
    }
    showDescription() {
        const { x, y, name, line, root, near } = this
        const {GX, GY} = root
        let div = this.descriptionContainer = document.createElement('div')
        div.classList.add('station-des')
        div.style.cssText = `position: fixed; left: ${GX * x + 25}px; top: ${y * GY + 16}px`
        const nextStation = () => {
            let result = ''
            for (const key in near) {
                result += near[key].name + ','
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

export default SubwayStation