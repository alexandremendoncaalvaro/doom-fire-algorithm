const doomFire = (() => {
    const debug = false
    const fireAnimationInterval = 20
    const colorPalette = colorsPalettes.fireColorsPalette
    const firePixelArray = []
    const fireWidth = 60
    const fireHeight = 40
    const numberOfPixels = fireWidth * fireHeight

    const start = () => {
        createFireDataStructure()
        createFireSource()
        renderFire()
        setInterval(calculateFirePropagation, fireAnimationInterval)
    }

    const createFireDataStructure = () => {
        firePixelArray[numberOfPixels] = null
        firePixelArray.fill(0)
    }

    const calculateFirePropagation = () => {
        let row = 0
        let column = 0
        for (let currentPixel = 0; currentPixel < numberOfPixels; currentPixel++) {
            const isColumnFirstRow = currentPixel % fireHeight === 0
            if (isColumnFirstRow) row = 0

            const pixelIndex = column + fireWidth * row
            updateFireIntensityPerPixel(pixelIndex)

            const isColumnLastRow = row === fireHeight - 1
            if (isColumnLastRow) column++

            row++
        }
        renderFire()
    }

    const updateFireIntensityPerPixel = currentPixelIndex => {
        const bellowPixelIndex = currentPixelIndex + fireWidth

        if (bellowPixelIndex >= numberOfPixels) return

        const decay = Math.floor(Math.random() * 3)
        const bellowPixelFireIntensity = firePixelArray[bellowPixelIndex]
        const newFireIntensity =
            bellowPixelFireIntensity - decay >= 0 ?
                bellowPixelFireIntensity - decay : 0

        firePixelArray[currentPixelIndex - decay] = newFireIntensity

    }

    const renderFire = () => {
        // const pixelArray = [...Array(numberOfPixels).keys()]
        let column = 0

        let html = '<table>'

        for (let pixelIndex = 0; pixelIndex < numberOfPixels; pixelIndex++) {
            const isRowFirstColumn = pixelIndex % fireWidth === 0
            if (isRowFirstColumn) {
                column = 0
                html += '<tr>'
            }

            const fireIntensity = firePixelArray[pixelIndex]

            const color = colorPalette[fireIntensity]
            const colorString = `${color.r},${color.g},${color.b}`

            if (debug === true) {
                html += '<td>'
                html += `<div class="pixel-index">${pixelIndex}</div>`
                html += `<div style="color: rgb(${colorString})">${fireIntensity}</div>`
                html += '</td>'
            } else {
                html += `<td class="pixel" style="background-color: rgb(${colorString})">`
                html += '</td>'
            }

            const isRowLastColumn = column === fireWidth
            if (isRowLastColumn) html += '</tr>'

            column++
        }

        html += '</table>'

        document.getElementById('fireCanvas').innerHTML = html
    }

    const createFireSource = () => {
        const overflowPixelIndex = fireHeight * fireWidth
        const columnFirstPixel = overflowPixelIndex - fireWidth

        for (let column = 0; column < fireWidth; column++) {
            const pixelIndex = columnFirstPixel + column
            firePixelArray[pixelIndex] = 36
        }
    }

    return {
        start: start
    }
})()

doomFire.start();