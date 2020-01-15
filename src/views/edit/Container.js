import Store from "./Store";
let rotateUrl = require('../../assets/rotate.png'), rotateImg = document.createElement('img')
rotateImg.src = rotateUrl

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
        this.rotate = 0
        this.lineDashOffset = 0
        this.luck = false
    }

    renderWrap () {
        let {x, y, width, height, color, focus, lineDashOffset, luck} = this
        // if (!focus) {
        //     return
        // }
        let rectCenterPointX = width / 2
        let rectCenterPointY = height / 2
        const {ctx} = Store
        ctx.translate(x + rectCenterPointX, y + rectCenterPointY)
        ctx.rotate(45 * Math.PI / 180);
        ctx.translate(-rectCenterPointX, -rectCenterPointY)
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
        ctx.strokeRect(0, 0, width, height);
        if (luck) {
            ctx.drawImage(rotateImg, (width / 2) - 9, - 30, 18, 18)
        }
    }
    isFocus () {
        const {x, y, width, height, luck} = this
        if (luck) {
            return true
        }
        const {mouse} = Store
        const {layerX = 0, layerY = 0} = mouse
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