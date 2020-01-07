<template>
  <div class="fall">
      <canvas id="canvas" ref="canvas"></canvas>
  </div>
</template>

<script>

class Boll {
    constructor (x, y, ctx, root) {
        this.x = x
        this.y = y
        this.color = this.randomColor()
        this.ctx = ctx
        this.radius = Math.floor(Math.random() * 20) + 10
        this.g = 2,
        this.vy = 0
        this.speed = this.radius / 1000000000
        this.k = 0
        this.destory = false
        this.root = root
        this.maxHieght = y
    }
    draw () {
        const {ctx, x, y, color, radius} = this
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2, false)
        ctx.closePath()
        ctx.fill()
    }
    randomColor () {
        const r = Math.random().toString(16).substr(2, 6)
        return '#' + r
    }
    updata () {
        const {g, initSpeed, k, y, speed, root, radius, vy} = this
        const {height} = root
        this.y += vy;
        this.vy += g;
        console.log(vy, g)
        if (Math.abs(this.vy) - 2 <= 0) {
            this.maxHieght = this.y
        }
        if( this.y >= height - 100 - radius ){
            this.y = height - radius - 100;
            this.vy = - vy * 0.75;
        }
        if (height - 100 - this.maxHieght - radius <= 10) {
            this.y = height - radius - 100;
            this.destory = true
        }
        this.draw()
        // this.k++
    }
}

class Fall {
    constructor (canvas) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.child = new Set()
        this.init()
        this.animate()
    }
    init () {
        const {canvas, ctx} = this
        canvas.width = this.width = document.documentElement.clientWidth
        canvas.height = this.height = document.documentElement.clientHeight
        canvas.addEventListener('click', e => {
            const {clientX, clientY} = e
            if (clientY > this.height - 200) {
                return
            }
            this.child.add(new Boll(clientX, clientY, ctx, this))
        })
    }
    animate () {
        const {width, height, color, ctx, child} = this
        requestAnimationFrame(this.animate.bind(this))
        ctx.clearRect(0, 0, width, height)
        ctx.beginPath()
        ctx.moveTo(0, height - 100)
        ctx.lineTo(width, height - 100)
        ctx.strokeStyle = '#999'
        ctx.stroke()
        ctx.closePath()
        for (const ball of child) {
            if (ball.destory) {
                child.delete(ball)
                continue
            }
            ball.updata()
        }
    }
}


export default {
    name: 'fall',
    mounted () {
        new Fall(this.$refs.canvas)
    }
}
</script>

<style lang="less">
    .fall {
        height: 100vh;
    }
</style>