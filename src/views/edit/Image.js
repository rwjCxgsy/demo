import Container from "./Container";
import Store from './Store'

class ImageContainer extends Container{
    constructor (option) {
        super()
        const {name, img, x, y, width, height} = option
        this.name = name
        this.img = img
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    draw () {
        const {img, width, height, x, y} = this
        if (!img) {
            return
        }
        const {ctx} = Store
        ctx.drawImage(img, x, y, width, height)
    }
    update () {
        this.draw()
    }
}

export default ImageContainer