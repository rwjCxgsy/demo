
function sixtyToTen (str) {
    const {length} = str
    let num = 0
    for (let i = 0; i < length; i++) {
        const char = str.charAt(i)
        let k = char
        switch (char) {
            case 'a':
                k = '10'
                break
            case 'b':
                k = '11'
                break
            case 'c':
                k = '12'
                break
            case 'd':
                k = '13'
                break
            case 'e':
                k = '14'
                break
            case 'f':
                k = '15'
                break
            default:
        }
        k = parseFloat(k)
        num += (k * Math.pow(16, length - i - 1))
    }
    return num.toString()
}

function colorMinix (colorA, colorB) {
    if (!colorB) {
        return colorA
    }
    if (colorA.charAt(0) === '#') {
        colorA = colorA.substr(1)
    }
    if (colorB.charAt(0) === '#') {
        colorB = colorB.substr(1)
    }
    colorA = colorA.toLowerCase()
    colorB = colorB.toLowerCase()
    colorA = colorA.match(/(\d|\w){2}/g).map(sixtyToTen)
    colorB = colorB.match(/(\d|\w){2}/g).map(sixtyToTen)
    let newColor = []
    colorA.forEach((v, i) => {
        const n = Math.floor(v * colorB[i] / 255)
        newColor.push(n.toString(16).padStart(2, '0'))
    })
    return '#' + newColor.join('')
}

export {
    colorMinix
}