import {Container} from "./Container";
import Store from './Store'

class ImageContainer extends Container{
    constructor (option) {
        const {img, x, y, width, height, name} = option
        super(x, y, width, height, name)
        this.img = img
    }
    render () {
        const {img, width, height, x, y} = this
        if (!img) {
            return
        }
        const {ctx} = Store
        ctx.drawImage(img, x, y, width, height)
    }
}

export default ImageContainer