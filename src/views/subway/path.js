// const logo = new Image();
// import start from '../start.png'
// import end from '../start.png'
import {intersection} from 'lodash'
let startImageURL = require('../../assets/start.png')
const startImage = document.createElement('img')
startImage.src = startImageURL
let endImageURL = require('../../assets/end.png')
const endImage = document.createElement('img')
endImage.src = endImageURL

console.log(startImage, endImage)

class Path {
    constructor (ctx, root) {
        this.ctx = ctx
        this.root = root
        this.scheme = Object.create(null)
    }
    planning () {
        const {startStation, endStation} = this.root
        console.log(startStation, endStation)

        const stepPath = new Set();
        let min = 99999;
        const allPath = []
        const minStep = (local, step) => {
            if (local.name === endStation.name) {
                if (step < min) {
                    min = step
                }
                allPath.push([...stepPath])
                return false
            }
            const {near} = local
            for (const key in near) {
                const next = near[key]
                if (!stepPath.has(next)) {
                    stepPath.add(next)
                    minStep(near[key], step + 1)
                    stepPath.delete(next)
                }
            }
        }
        stepPath.add(startStation)
        minStep(startStation, 0)

        const changeNumber = (path) => {
            let index = 0
            let prevLine = intersection(path[0].line, path[1].line)[0]
            let prevStation = path[1]
            for (let i = 2; i < path.length ; i++) {
                const curr = intersection(prevStation.line, path[i].line)[0]
                if (curr !== prevLine) {
                    index++
                    prevLine = curr
                }
                prevStation = path[i]
            }
            console.log('-------', index)
            return index
        }
        let minFoot = allPath.map(v => v.length).sort((a, b) => (a > b ? 1 : -1))[0]
        const compare = []
        allPath.forEach(plan => {
            if (plan.length < minFoot + 1) {
                compare.push([...plan])
            }
        })
        const minChange = compare.map(v => changeNumber(v)).sort((a, b) => (a > b ? 1 : -1))[0]
        let k = 1
        compare.forEach(v => {
            if (minChange === changeNumber(v)) {
                this.scheme[k++] = v
            }
        })
        console.log(this.scheme)
    }
    updata () {
        this.planning()
        this.draw()
    }
    create (station) {
        const {startStation, endStation, GX, GY} = this.root
        const {ctx} = this
        let image = startImage
        let {x, y} = station
        if (startStation && endStation) {
            image = endImage
        }
        ctx.globalAlpha = 1
        ctx.drawImage(image, x * GX - 20, y * GY - 40, 40, 40)
    }
    draw () {
        const {scheme, ctx, root} = this
        const colors = {
            1: 'red',
            2: 'green',
            3: 'yellow',
            4: 'blue'
        }
        ctx.globalAlpha = 0.5
        ctx.lineWidth = 10
        ctx.lineCap = "round"
        ctx.lineJoin="round";
        function localDraw (key, path) {
            const color = colors[key]
            const {x: sx, y: sy} = path[0]
            const {GX, GY} = root
            ctx.strokeStyle = color
            ctx.beginPath()
            ctx.moveTo(sx * GX, sy * GY)
            for (let i = 1; i < path.length; i++) {
                const {x: nx, y: ny} = path[i]
                ctx.lineTo(nx * GX, ny * GY)
            }
            ctx.stroke()
        }

        for (const key in scheme) {
            const path = scheme[key]
            localDraw(key, path)
        }
    }
}


export default Path