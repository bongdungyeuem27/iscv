export function resizeImage(image, width, height, type) {
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      image,
      width,
      height,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri)
      },
      type || 'file'
    )
  })
}
