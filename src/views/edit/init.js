import Observer from "./Observe";
import Store  from "./Store";
import ImageContainer from "./Image";
import Observe from "./Observe";
import Text from './Text'

function loadFile (file) {
    // const {files} = target
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    return new Promise(resolve => {
        fileReader.onload = () => {
            resolve([null, fileReader])
        }
        fileReader.onerror = (error) => {
            resolve([error])
        }
    })
}

function loadImage ({result}) {
    return new Promise(resolve => {
        const image = new Image()
        image.src = result
        image.onload = data => {
            resolve([null, {image, imageData: data}])
        }
        image.error = error => {
            resolve([error])
        }
    })
}

async function Load ({target}) {
    const {files} = target
    const [file] = files
    const [error, date] = await loadFile(file)
    if (error) {
        alert('图片加载失败')
        return
    }
    console.log(date)
    const [imageError, imgData] = await loadImage(date)
    if (imageError) {
        alert('图片加载失败')
        return
    }
    console.log(imgData)
    const {image, imageData: {path}} = imgData
    const [img] = path
    const {naturalWidth, naturalHeight} = img
    let {ctx: {canvas: {width: cw, height: ch}}} = Store
    let margin = Store._canvasMargin
    cw -= margin
    ch -= margin
    const wr = cw / ch
    const ir = naturalWidth / naturalHeight
    let width = 0
    let height = 0
    if (naturalWidth <= cw && naturalHeight <= ch) {
        width = naturalWidth
        height = naturalHeight
    } else if (naturalWidth > width && naturalHeight > height) {
        if (wr <= ir) {
            // 高度自适应
            console.log('宽度自适应')
            width = cw
            height = cw / ir
        } else {
            console.log('高度自适应')
            // 高度自适应
            height = ch
            width =  ch * ir
        }
    } else if (naturalWidth > width && naturalHeight <= height) {
        console.log('3')
        height = cw / ir
        width =  cw
    } else {
        console.log('4')
        height = ch
        width =  ch * ir
    }
    return {
        img: image,
        x: cw / 2 + (margin / 2)  - width / 2,
        y: ch / 2 + (margin / 2) - height / 2,
        height,
        width,
        name: file.name
    }
}

async function Init(file, fn) {
    const d = await Load(file)
    fn(d)
}

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
}


export default function ({canvas, file, text}) {
    const {parentNode: rootNode} = canvas
    const {width, height} = rootNode.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    const input = document.createElement('input')
    input.style.cssText = 'position: absolute; left: 0; top: 0;border:0;color:red;outline:none;z-index:-111;'
    rootNode.style.position = 'relative'
    rootNode.append(input)
    const ctx = canvas.getContext('2d')
    Store.ctx = ctx
    Store.input = input
    input.addEventListener('input', () => {
        Observer.emit('input')
    })
    function animate() {
        Store.forceUpdate()
        requestAnimationFrame(animate)
    }


    animate()
    canvas.addEventListener('mousemove', e => {
        Store.mouse = e
    })

    canvas.addEventListener('mousedown', () => {
        Store.mouseDown = true
    })
    canvas.addEventListener('mouseup', () => {
        Store.mouseDown = false
        Store.lastMouse = null
    })
    canvas.addEventListener('click', () => {
        if (Store.focus) {
            console.log(Store.focus)
            Store.focus.luck = true
        } else {
            for (let i of Store.riseContent()) {
                i.luck = false
            }
        }
    })

    file.addEventListener('change', (file) => {
        Init(file, date => {
            console.log(date)
            createContainer({type: 'image', date})
        })
    })

    text.addEventListener('click', () => {
        createContainer({type: 'text'})
    })
}