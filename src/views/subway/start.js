import {Segment, Line} from './line'
import SubwayStation from './point'
import Path from './path'
import { list as subWay, lineColor } from './date'


const isDrawPointKey = new Set()
const isDrawPoint = new Set()
const isDrawSegmentPath = new Set()

class CitySubway {
    constructor (container, width, height) {
        this.container = container
        this.width = width
        this.height = height
        this.offset = {}
        this.GX = 60
        this.GY = 50
        this.init()
        this.animate()
        this.mouse = {x: 0, y: 0}
        this.startStation = null
        this.endStation = null
    }

    init () {
        const [lineCTX, stationCTX, pathCTX] = this.createCanvas()
        this.lineCTX = lineCTX
        this.stationCTX = stationCTX
        const cachePoint = Object.create(null)
        const cacheSegment = Object.create(null)
        for (const item of subWay) {
            cachePoint[item.id] = new SubwayStation(item, stationCTX, this)
        }
        for (const d1 in cachePoint) {
            const {near} = cachePoint[d1]
            for (const d2 in near) {
                near[d2] = cachePoint[d2]
                const path = near[d2].key * cachePoint[d1].key
                cacheSegment[path] = new Segment(near[d2], cachePoint[d1], lineCTX)
            }
        }
        this.cacheSegment = cacheSegment
        this.cachePoint = cachePoint
        this.map = cachePoint['tfgc']
        this.pathCTX = pathCTX
        this.path = new Path(pathCTX, this)
        console.log(this)
    }

    createCanvas () {
        const {container, width, height} = this
        const line = document.createElement('canvas')
        line.width = width
        line.height = height

        const station = document.createElement('canvas')
        station.width = width
        station.height = height

        const path = document.createElement('canvas')
        path.width = width
        path.height = height

        container.append(line)
        container.append(station)
        container.append(path)

        path.addEventListener('mousemove', e => {
            const { offsetX, offsetY, pageX, pageY } = e
            this.offset.x = offsetX
            this.offset.y = offsetY
            this.offset.pageX = pageX
            this.offset.pageY = pageY
        })
        path.addEventListener('click', e => {
            const {pointer, pathCTX, width, height} = this
            if (!pointer) {
                return
            }
            this.mouse = { x: e.x, y: e.y }
            if (!this.startStation) {
                this.startStation = pointer
            } else if (!this.endStation){
                this.endStation = pointer
                if (pointer.name === this.startStation.name) {
                    pathCTX.clearRect(0, 0, width, height)
                    this.startStation = pointer
                    return
                }
            } else {
                this.startStation = pointer
                this.endStation = null
                pathCTX.clearRect(0, 0, width, height)
            }
            this.path.create(pointer)
            if (this.endStation) {
                this.path.scheme = Object.create(null)
                this.path.updata()
            }
        })
        return [
            line.getContext('2d'),
            station.getContext('2d'),
            path.getContext('2d')
        ]
    }

    updata () {
        const {cacheSegment, cachePoint, stationCTX, pathCTX} = this
        // 线段更新
        for (const key in cacheSegment) {
            cacheSegment[key].updata()
        }
        this.pointer = null
        // 更新
        // let _point = null
        for (const key in cachePoint) {
            cachePoint[key].updata()
            if (cachePoint[key].pointer) {
                this.pointer = cachePoint[key]
                // _point = cachePoint[key]
            }
        }
        // if (_point) {
        //     if (!this.startStation) {
        //         this.startStation = _point
        //     } else [
        //         this.endStation = _point
        //     ]
        // } else {

        // }
           
        if (this.pointer) {
            pathCTX.canvas.style.cursor = 'pointer'
        } else {
            pathCTX.canvas.style.cursor = 'default'
        }
    }

    animate () {
        requestAnimationFrame(this.animate.bind(this))
        const {width, height, lineCTX, stationCTX} = this
        lineCTX.clearRect(0, 0, width, height)
        stationCTX.clearRect(0, 0, width, height)
        this.updata(this.map)

    }
}


export function start(container, width, height) {
    console.time('map')
    new CitySubway(container, width, height)
    console.timeEnd('map')
}