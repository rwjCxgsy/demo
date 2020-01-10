import Store from "./Store";
import ImageContainer from "./Image";
import Observe from "./Observe";
import Text from './Text'

class Container {
    constructor () {
        let {zoomIndex} = Store
        let id = zoomIndex++
        this.id = `id-${id}`
        this.zIndex = id
        this.show = true
    }
}

export default Container

export function createContainer ({type, date}) {
    let container = null
    if (type === 'text') {
        const {input} = Store
        input.focus()
        container =  new Text()
    } else {
        container =  new ImageContainer(date)
    }
    Store.addContent(container)
    Observe.emit('zoom', Store.includes)
}