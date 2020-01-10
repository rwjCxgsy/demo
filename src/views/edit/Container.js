import Store from "./Store";

export class Container {
    constructor (x = 0, y = 0, width = 0, height = 0, name = '') {
        let id = Store.zoomIndex++
        this.id = `id-${id}`
        this.zIndex = id
        this.show = true
        this.focus = false
        this.width = width
        this.height = height
        this.x = x
        this.y = y
        this.name = name
        this.color = '#' + Math.random().toString(16).slice(2,8)
        this.transform = {}
        this.lineDashOffset = 0
    }

    renderWrap () {
        let {x, y, width, height, color, focus, lineDashOffset} = this
        if (!focus) {
            return
        }
        const {ctx} = Store
        ctx.save()
        if (lineDashOffset > 50) {
            this.lineDashOffset = -1
        }
        ctx.lineDashOffset = this.lineDashOffset++
        x -= 1.5
        width += 3
        width += 1
        y -= 1.5
        height += 3
        ctx.strokeStyle = color
        ctx.lineWidth = 1
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(x, y, width, height);
        ctx.restore()
    }
    isFocus () {
        const {mouse} = Store
        const {layerX = 0, layerY = 0} = mouse
        const {x, y, width, height} = this
        if (layerX >= x && layerX <= (x + width) && layerY >= y && layerY <= (y + height)) {
            return this
        }
        return false
    }

    move () {
        const {mouseDown, mouse, focus, lastMouse} = Store
        if (mouseDown && focus === this) {
            const {x, y} = focus
            let offsetX = 0
            let offsetY = 0
            const {layerX, layerY} = mouse
            if (!Store.lastMouse) {
                Store.lastMouse = {
                    x: layerX,
                    y: layerY
                }
            } else {
                const {x: lx, y: ly} = lastMouse
                offsetX = layerX - lx
                offsetY = layerY - ly
                Store.lastMouse = {
                    x: layerX,
                    y: layerY
                }
            }
            this.x = x + offsetX
            this.y = y + offsetY
        }
    }

    update () {
        const {ctx, mouseDown} = Store
        let set = Store.riseContent(false)
        let maxZoom = false
        for (let item of set) {
            const _focus = item.isFocus()
            if (_focus) {
                if (!maxZoom) {
                    Store.focus = item
                    item.focus = true
                    maxZoom = true
                } else {
                    item.focus = false
                }
            } else {
                item.focus = false
            }
        }
        if (maxZoom) {
            ctx.canvas.style.cursor = 'move'
            this.move()
        } else {
            Store.focus = null
            ctx.canvas.style.cursor = ''
        }

        if (!(mouseDown && Store.focus)) {
            this.isFocus()
        }
        this.renderWrap()
        this.render()
    }
}