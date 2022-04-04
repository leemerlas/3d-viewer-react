const TO_RADIANS = Math.PI / 180

export async function canvasPreview(image, canvas, crop, scale = 1, rotate = 0) {
    const ctx = canvas.getContext('2d')

    if (!ctx) {
        throw new Error('No 2d context')
    }

    console.log(canvas);
    console.log(crop);

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const pixelRatio = window.devicePixelRatio
    const ratio = image.width / image.height
    let newWidth = canvas.width
    let newHeight = newWidth / ratio
    
    if (newHeight < canvas.height) {
        newHeight = canvas.height
        newWidth = newHeight * ratio
    }

    const xOffset = newWidth > canvas.width ? (canvas.width - newWidth) / 2 : 0
    const yOffset = newHeight > canvas.height ? (canvas.height - newHeight) / 2 : 0

    canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
    // canvas.width = Math.floor(crop.width * scaleX * pixelRatio)
    // canvas.height = Math.floor(crop.height * scaleY * pixelRatio)
    // canvas.width = scaleX * image.width 
    // canvas.height = scaleY * image.height 

    ctx.scale(pixelRatio, pixelRatio)
    ctx.imageSmoothingQuality = 'high'

    const cropX = crop.x * scaleX
    const cropY = crop.y * scaleY

    const rotateRads = rotate * TO_RADIANS
    const centerX = image.naturalWidth / 2
    const centerY = image.naturalHeight / 2

    ctx.save()
    ctx.translate(-cropX, 130)
    ctx.translate(centerX, centerY)
    ctx.rotate(rotateRads)
    ctx.scale(scale, scale)
    ctx.translate(-centerX, -centerY)
    // ctx.drawImage(
    //     image,
    //     xOffset,
    //     yOffset,
    //     image.naturalWidth,
    //     image.naturalHeight,
    //     xOffset,
    //     yOffset,
    //     newWidth * scale,
    //     newHeight * scale

    // )
    ctx.drawImage(
        image,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
        0,
        0,
        image.naturalWidth,
        image.naturalHeight,
    )
    ctx.restore()

    
    return canvas.toDataURL('image/png')
}