import Observer from "./Observe";

// const content = new Proxy({}, {
//     get(target, p, receiver) {
//         return
//     },
//     set(target, p, value, receiver) {
//
//     }
// })

class Store {
    constructor() {
        this.focus = false
        this.mouseDown = false
        this.ctx = null
        this.input = null
        this.mouse = {}
        this.zoomIndex = 1
        this._canvasMargin = 50
        this.init()
        this.lastMouse = null
    }

    init () {
        Observer.on('change', data => {
            console.log('change')
            const {id, show} = data
            for (let c of this.includes) {
                if (c.id === id) {
                    console.log(c)
                    c.show = show
                }
            }
            this.forceUpdate()
        })

        Observer.on('move', data => {
            const {type, index} = data
            console.log(type, index)
            const item = Store._content[index]
            Store._content.splice(index, 1)
            if (type === 'up') {
                Store._content.splice(index - 1, 0, item)
            } else {
                Store._content.splice(index + 1, 0, item)
            }
            Observer.emit('zoom', Store._content)
        })
    }

    forceUpdate () {
        const {ctx} = this
        const {width, height} = ctx.canvas
        ctx.clearRect(0,0, width, height)
        let sort = this.riseContent()
        // let set = Store.riseContent(false)
        // let maxZoom = false
        // if (this.focus)
        // for (let content of set) {
        //     if (content.show) {
        //         if (content.isFocus()) {
        //             if (!maxZoom && !this.mouseDown) {
        //                 content.focus = true
        //                 this.focus = content
        //                 maxZoom = true
        //             } else if (this.mouseDown) {
        //                 content.focus = true
        //                 maxZoom = true
        //             } else {
        //                 content.focus = false
        //             }
        //         } else {
        //             content.focus = false
        //         }
        //     } else {
        //         content.focus = false
        //     }
        // }
        // if (!maxZoom) {
        //     this.focus = null
        //     this.ctx.canvas.style.cursor = ''
        // } else {
        //     const {ctx, mouseDown, mouse, focus, lastMouse} = this
        //     ctx.canvas.style.cursor = 'move'
        //     if (mouseDown) {
        //         const {x, y} = focus
        //         let offsetX = 0
        //         let offsetY = 0
        //         const {layerX, layerY} = mouse
        //         if (!this.lastMouse) {
        //             this.lastMouse = {
        //                 x: layerX,
        //                 y: layerY
        //             }
        //         } else {
        //             const {x: lx, y: ly} = lastMouse
        //             offsetX = layerX - lx
        //             offsetY = layerY - ly
        //             this.lastMouse = {
        //                 x: layerX,
        //                 y: layerY
        //             }
        //         }
        //         this.focus.x = x + offsetX
        //         this.focus.y = y + offsetY
        //     } else {
        //         this.lastMouse = null
        //     }
        // }
        for (let content of sort) {
            if (content.show) {
                ctx.save()
                content.update()
                ctx.restore()
            }
        }
    }

    riseContent (rise = true) {
        let clone = [...Store._content]
        return rise ? clone : clone.reverse()
    }

    static _content = []
    get includes () {
        return Store._content
    }
    set includes (value) {
        Store._content = value
    }

    addContent (container) {
        console.log(Store._content)
        Store._content.push(container)
        Observer.emit('zoom', Store._content)
    }

}

export default new Store()