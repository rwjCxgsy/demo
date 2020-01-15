import Store from "./Store";
import {Container} from "./Container";
import Font from './Font'

class Text extends Container{
    constructor (option = {}) {
        const {width = 200, height = 50} = option
        const {ctx: {canvas: {width: cw, height: ch}}} = Store
        let x = (cw / 2) - (width / 2)
        let y = (ch / 2) - (height / 2)
        super(x, y, width, height, '文本图层')
        this.fontes = []
    }
    addFont (font) {
        this.fontes.push(font)
    }

    render () {
        const {fontes, x, y} = this
        let startX = x, startY = y
        for (let font of fontes) {
            const {actualBoundingBoxRight, actualBoundingBoxLeft} = font.option.TextMetrics
            font.update({x: startX, y: startY})
            let fontWidth = (Math.abs(actualBoundingBoxRight) + Math.abs(actualBoundingBoxLeft))
            startX += fontWidth
        }
    }
}


export default Text
