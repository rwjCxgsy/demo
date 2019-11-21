import Line from './line'
import SubwayStation from './point'

import { list as subWay } from './date'

const MAP = []

class CitySubway {
    constructor (container, width, height) {
        console.log('初始化')
        this.container = container
        this.width = width
        this.height = height
        this.offset = {}
        this.GX = 60
        this.GY= 50
        this.init()
        this.animate()
    }

    init () {
        const [lineCTX, stationCTX] = this.createCanvas()
        this.lineCTX = lineCTX
        this.stationCTX = stationCTX

        for (const key in subWay) {
            if (subWay.hasOwnProperty(key)) {
                const item = subWay[key];
                MAP.push(new SubwayStation(item, stationCTX, this))
            }
        }

        console.log(MAP)
    }

    createCanvas () {
        const {container, width, height} = this
        const line = document.createElement('canvas')
        line.width = width
        line.height = height
        const station = document.createElement('canvas')
        station.width = width
        station.height = height
        container.append(line)
        container.append(station)

        station.addEventListener('mousemove', e => {
            const { offsetX, offsetY } = e
            this.offset.x = offsetX
            this.offset.y = offsetY    
        })
        return [
            line.getContext('2d'),
            station.getContext('2d')
        ]
    }

    animate () {
        const {width, height, lineCTX, stationCTX} = this
        lineCTX.clearRect(0, 0, width, height)
        stationCTX.clearRect(0, 0, width, height)
        for (const item of MAP) {
            item.updata()
        }
    }
}

function launch(canvasLine, width, height) {
    const canvasWidth = 1200
    const canvasHeight = 900
    canvasStation.addEventListener('mousemove', mousemove)
    function mousemove(e) {
        const { offsetX, offsetY } = e
        offset.x = offsetX
        offset.y = offsetY
    }
    canvasLine.width = canvasWidth
    canvasLine.height = canvasHeight
    canvasStation.width = canvasWidth
    canvasStation.height = canvasHeight

    lineCTX = canvasLine.getContext('2d')
    stationCTX = canvasStation.getContext('2d')
    for (const k in subWay) {
        lineList.push(new SubwayStation(subWay[k]))
    }
    function animate() {
        // requestAnimationFrame(animate)
        lineCTX.clearRect(0, 0, canvasWidth, canvasHeight)
        stationCTX.clearRect(0, 0, canvasWidth, canvasHeight)
        for (let line of lineList) {
            line.updata()
        }
    }
    animate()
}


export function start(container, width, height) {
    // new CitySubway(container, width, height)
}