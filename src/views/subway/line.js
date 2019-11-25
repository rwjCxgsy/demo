import {lineColor} from './date'

class Line {
    constructor () {
        this.child = Object.create(null)
    }
    updata () {
        const {child, focus} = this
        for (const key in child) {
            const item = child[key]
            if (focus) {
                item.width = 8
            } else {
                item.width = 5
            }
            item.draw()
        }
    }
}

const lines = Object.create(null)

for (const key in lineColor) {
    if (lineColor.hasOwnProperty(key)) {
        const line = lineColor[key];
        lines[key] = new Line()
    }
}

console.log(lines)

class Segment {
    constructor (prep, next, ctx) {
        const {x: px, y: py, root, line: pline} = prep
        const {x: nx, y: ny, line: nline} = next
        this.prep = prep
        this.next = next
        this.root = root
        this.ctx = ctx
        this.px = px
        this.py = py
        this.nx = nx
        this.ny = ny
        let line = pline.find(v => (nline.includes(v)))
        const color = (lineColor[line])
        this.originLine = line
        this.color = color
        this.width = 4
        this.id = prep.key * next.key
        lines[line].child[this.id] = this
        this.father = lines[line]
    }
    draw () {
        const {px, py, nx, ny, color, width, root, ctx} = this
        const {GX, GY} = root
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ctx.beginPath()
        ctx.moveTo(px * GX, py * GY)
        ctx.lineTo(nx * GX, ny * GY)
        ctx.closePath()
        ctx.stroke()
    }
    updata () {
        const {px, py, nx, ny, root} = this
        const {GX, GY, offset: mouse} = root
        const cur = {
            x: px,
            y: py
        }
        const next = {
            x: nx,
            y: ny
        }
        const offset = {
            GX,
            GY,
            ...mouse
        }
        if (this.computed(cur, next, offset)) {
            this.father.focus = true
        } else {
            this.father.focus = false
        }
        this.father.updata()
    }
    computed(start, end, offset) {
        const { x, y, GX, GY } = offset
        const SX = start.x
        const SY = start.y
        const EX = end.x
        const EY = end.y
        const maxX = Math.max(SX, EX) * GX
        const minX = Math.min(SX, EX) * GX
        const maxY = Math.max(SY, EY) * GY
        const minY = Math.min(SY, EY) * GY
        if (x - 4 > maxX || x + 4 < minX || y - 4 > maxY || y + 4 < minY) {
            return false
        }
        const k = ((EY - SY) * GY) / ((EX - SX) * GX)
        let b = SY * GY - SX * GX * k
        if (!isFinite(k)) {
            return Math.abs(x - maxX) <= 4
        }
        if (k === 0) {
            return Math.abs(y - maxY) <= 4
        }
        return Math.abs(x * k - y + b) <= 4
    }
}


export { 
    Line,
    Segment
}