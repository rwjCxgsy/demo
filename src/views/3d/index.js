// import fa from "element-ui/src/locale/lang/fa";

// import de from "element-ui/src/locale/lang/de";
import {Global} from './const'
// import {whiteBoll} from  './whiteBoll'
import {Boll, getBoll, addBoll} from './boll'


// let bolls = []

let isRunning = () => getBoll().some(v => v.speed >= 0.01)

const drawRod = (ctx) => {
    if (isRunning()) {
        return
    }
    const {x, y} = getBoll()[0]
    let {mouse: {x: mx, y: my}, left, top} = Global
    let deg = (my - (y + top)) / (mx - (x + left))
    deg = Math.atan(deg)
    if (mx < (x + left)) {
        deg += Math.PI
    }
    Global.deg = deg
    ctx.clearRect(0,0, window.innerWidth, window.innerHeight)
    // ctx.fillStyle = 'red'
    // ctx.fillRect(Math.random() * 100, Math.random() * 100 , 20, 20)
    ctx.save()
    ctx.fillStyle = 'red'
    ctx.translate(left + x, y + top)
    ctx.rotate(deg - Math.PI / 2)
    ctx.fillRect(-5, 12, 10, 100)
    ctx.fill()
    ctx.restore()
}

/**
* @return {HTMLCanvasElement}
**/
const initTopCanvas = () => {
    // const {width, height} = Global
    const topCanvas = document.createElement('canvas')
    topCanvas.width = window.innerWidth
    topCanvas.height = window.innerHeight
    topCanvas.style.cssText = `position:absolute;top:0;z-index:11;`
    document.getElementsByClassName('three')[0].append(topCanvas)
    return topCanvas
}

function init (canvas) {
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    const {width, height, left, top} = rect
    Global.width = width
    Global.height = height
    Global.left = left
    Global.top = top
    const topCanvas = initTopCanvas()
    const topCtx = topCanvas.getContext('2d')
    topCanvas.addEventListener('mousemove', e => {
        const {offsetX, offsetY, pageX, pageY} = e
        Global.mouse = {x: offsetX, y: offsetY}
        Global.page = {x: pageX, y: pageY}
        topCtx.clearRect(-1000,-1000, 2000, 2000)
        drawRod(topCtx)
    })

    topCanvas.addEventListener('click', () => {
        console.log(isRunning())
        if (isRunning()) {
            return
        }
        console.log(getBoll())
        for (let item of getBoll()) {
            item.ready()
        }
        const whiteBoll = getBoll()[0]
        const {deg} = Global
        whiteBoll.vw = Math.cos(deg + Math.PI)
        whiteBoll.vh = Math.sin(deg + Math.PI)
        topCtx.clearRect(0,0, topCtx.width, topCtx.height)
        function animate () {
            if (isRunning()) {
                requestAnimationFrame(animate)
            }
            ctx.clearRect(0,0, width, height)
            for (let item of getBoll()) {
                item.update()
            }
        }
        animate()
    })

    initWhiteBoll(ctx)
    initRed(ctx)
}

function initRed (ctx) {
    const {width} = Global
    Array(1).fill(0).forEach((v, i) => {
        const redBoll = new Boll({
            ctx,
            x: width / 2 + i * 50,
            y: 100
        })
        addBoll(redBoll)
        redBoll.draw()
    })
}

function initWhiteBoll (ctx) {
    // 初始化白球
    const {width, height} = Global
    const option = {
        isWhiteBoll: true,
        x: width / 2,
        y: height / 5 * 4,
        ctx
    }
    const whiteBoll = new Boll(option)
    addBoll(whiteBoll)
    whiteBoll.draw()
}

/**
 * @param {HTMLCanvasElement} canvas
 * */
export function start (canvas) {
    init(canvas)
}