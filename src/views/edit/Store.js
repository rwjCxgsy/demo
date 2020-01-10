import Observer from "./Observe";

class Store {
    constructor() {
        Observer.on('change', data => {
            console.log('change')
            const {id, show} = data
            for (let c of Store.includes) {
                if (c.id === id) {
                    console.log(c)
                    c.show = show
                }
            }
            this.forceUpdate()
        })
    }

    _canvas = null
    set ctx (value) {
        this._canvas = value
    }
    get ctx () {
        return this._canvas
    }


    _input = null
    set input (value) {
        this._input = value
    }
    get input () {
        return this._input
    }

    _mouse = null

    set mouse (event) {
        this._mouse = event
    }

    forceUpdate () {
        const {ctx} = this
        const {width, height} = ctx.canvas
        ctx.clearRect(0,0, width, height)
        let aort = Store.riseContent()
        for (let content of aort) {
            if (content.show) {
                content.update()
            }
        }
    }

    get mouse () {
        return this._mouse
    }

    static riseContent () {
        return Store._content.sort((a, b) => {
            return a.zIndex  > b.zIndex  ? 1 : -1
        })
    }

    static _content = []
    get includes () {
        return Store._content
    }
    set includes (value) {
        Store._content = value
    }

    addContent (container) {
        Store._content.push(container)
    }

    _zoomIndex = 1
    get zoomIndex () {
        return this._zoomIndex
    }
    set zoomIndex (value) {
        this._zoomIndex = value
    }
}

export default new Store()