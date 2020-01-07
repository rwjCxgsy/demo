import {Global} from './const'

export const whiteBoll = {
    x: 0,
    y: 0,
    vw: 20,
    vh: 20,
    speed: 0,
    isRun: false,
    ctx: null,
    radius: 10,
    color: 'white',
    ready () {
        this.speed = 1.5
        this.vw = 20
        this.vh = 20
    },
    update () {
        const {x, y, speed, radius} = this
        const {width, height} = Global
        if (x + radius >= width || x - radius <= 0) {
            this.vw = -this.vw
        }
        if (y + radius >= height || y - radius <= 0) {
            this.vh = -this.vh
        }
        this.x += speed * this.vw
        this.y += speed * this.vh
        this.speed *= .994
        this.draw()
    },
    draw () {
        const {x, y, ctx, radius} = this
        const radgrad = ctx.createRadialGradient(x, y, radius,x-3,y-3,radius - 8);
        radgrad.addColorStop(0, '#999');
        radgrad.addColorStop(1, '#fff');
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI*2, true); // 绘制
        ctx.closePath()
        ctx.fillStyle = radgrad
        ctx.fill()
    }
}