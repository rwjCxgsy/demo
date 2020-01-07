import {Global} from "./const";
let id = 0
const bolls = []
let measured = []



export class Boll {
    constructor(options) {
        let {x, y, radius = 10, ctx, speed = 0, isWhiteBoll = false, color = ['red', '#faa']} = options
        this.id = id++
        this.ctx = ctx
        this.radius = radius
        this.x = x
        this.y = y
        this.vw= 0
        this.vh = 0
        this.speed = speed
        this.isWhiteBoll = isWhiteBoll
        if (isWhiteBoll) {
            color = ['#999', '#fff']
        }
        this.color = color
    }

    draw () {
        const {x, y, ctx, radius, color} = this
        const [sColor, eColor] = color
        const gradColor = ctx.createRadialGradient(x, y, radius,x-3,y-3,radius - 8);
        gradColor.addColorStop(0, sColor);
        gradColor.addColorStop(1, eColor);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true); // 绘制
        ctx.closePath()
        ctx.fillStyle = gradColor
        ctx.fill()
    }

    checkCollide () {
        for (let boll of bolls) {
            if (boll !== this) {
                const {x, y, radius, speed} = boll
                const {x: thisx, y: thisy} = this
                if (Math.sqrt((x-thisx) ** 2 + (y-thisy) ** 2) <= radius * 2) {
                    // console.log(`${boll.id}和${this.id}`)
                    let deg = (y - thisy) / (x - thisx)
                    deg = Math.atan(deg)
                    if (x < thisx) {
                        deg += Math.PI // 补全
                    }
                    const _d = (Math.abs(deg) % (Math.PI / 2)) / Math.PI
                    const force = 90 / 100 * _d
                    this.speed = force * speed
                    this.vw = Math.cos(deg + Math.PI)
                    this.vh = Math.sin(deg + Math.PI)
                    boll.speed = (1 - force) * speed
                    console.log(force * speed, (1 - force) * speed)
                    boll.vw = Math.cos((deg + Math.PI) / 2)
                    boll.vh = Math.sin((deg + Math.PI) / 2)
                    console.log(this.vw)
                }
            }
        }
    }

    update () {
        this.checkCollide()
        const {x, y, speed, radius} = this
        const {width, height} = Global
        if ((x + radius) >= width || (x - radius) <= 0) {
            this.vw = -this.vw
        }
        if ((y + radius) >= height || (y - radius) <= 0) {
            this.vh = -this.vh
        }
        this.x += speed * this.vw
        this.y += speed * this.vh
        this.speed *= .99
        this.draw()
    }

    ready () {
        const {isWhiteBoll} = this
        this.speed = isWhiteBoll ? 20 : 16
    }
}

export const getBoll = () => bolls

export const addBoll = (boll) => {
    bolls.push(boll)
}