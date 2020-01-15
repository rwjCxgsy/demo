
class Observe {
    constructor () {
        this.watch = {}
    }
    emit (type, data) {
        const {watch} = this
        if (watch[type]) {
            for (let fn of watch[type]) {
                fn.call(null, data)
            }
        }
    }
    on (type, fn) {
        if (!this.watch[type]) {
            this.watch[type] = new Set()
        }
        this.watch[type].add(fn)
    }
    off () {}
}

export default new Observe()