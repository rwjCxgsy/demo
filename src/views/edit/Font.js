import Store from "./Store";

class Font{
    constructor (option = {}) {
        const defaultOption =  {x: 0, y: 0, fontSize: 30, fontFamily: '微软雅黑', bold: '', fillStyle : '#000'}
        this.option = Object.assign(defaultOption, option)
        this.setFontBasic()
        console.log(this)
    }
    setFontBasic () {
        const {ctx} = Store
        const {fontSize = 16, fontFamily = '微软雅黑', bold = '', text, fillStyle} = this.option
        const font = `${fontSize}px ${bold} ${fontFamily}`
        ctx.save()
        ctx.font = font
        ctx.fillStyle = fillStyle
        this.option.TextMetrics = ctx.measureText(text)
        this.option.font = font
        ctx.restore()
    }
    write () {
        const {ctx} = Store
        const {text, x, y, font, fillStyle} = this.option

        ctx.font = font
        ctx.fillStyle = fillStyle
        ctx.fillText(text, x, y)
    }
    update (option) {
        const {option: defaultOption} = this
        this.option = Object.assign(defaultOption, option)
        this.setFontBasic()
        this.write()
    }
}

export default Font