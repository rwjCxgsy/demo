class Line {
    constructor(subwayLine, ctx, root) {
        const {line, value, color, list} = subwayLine
        this.name = value
        this.ctx = ctx
        this.width = 5
        this.line = line
        this.color = color
        this.descriptionContainer = null
        this.stations = []
        this.prevDirection = {}
        // this.active = false
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
        const {name, width, stations: list, ctx, color } = this
        console.log(this)
        // const direction = ''
        const { length } = list
        let [ ins ] = list
        let {x: x1, y: y1} = ins
        ctx.strokeStyle = color
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ins.draw()
        for (let i = 0; i < length; i++) {
            const {x: x2, y: y2} = ins = list[i]
            ctx.beginPath()
            ctx.moveTo(x1 * GX, y1 * GY)
            ctx.lineTo(x2 * GX, y2 * GY)
            x1 = x2
            y1 = y2
            if (name === 'line7' && i === length - 1) {
                x2 = list[0].x
                y2 = list[0].y
                ctx.moveTo(x1 * GX, y1 * GY)
                ctx.lineTo(x2 * GX, y2 * GY)
            }
            ctx.stroke()  
            // ctx.closePath()
            ins.updata()
        }
    }
    updata() {
        // const { line } = this
        // const list = Object.keys(line)
        const {stations: list} = this
        for (let i = 0; i < list.length - 1; i++) {
            const cur = list[i];
            const next = list[i + 1]
            if (this.computed(cur, next)) {
                if (this.width === 8) {
                    break
                }
                this.width += 1
                break;
            } else {
                if (this.width === 5) {
                    break
                }
                this.width -= 1
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

class Segment {
    constructor (prep, next) {
        const {x: px, y: py, root, line: pline} = prep
        const {x: nx, y: ny, line: nline} = next
        this.px = px
        this.py = py
        this.nx = nx
        this.ny = ny
        console.log(pline.name, nline.name)
        // this.start = start
        // this.end = end
        // this.color = color
        // this.width = width
    }
}

export default Segment