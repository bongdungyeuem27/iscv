import { BOARDDIMENSION } from '@page/CustomCV/config'

const WIDTH = 800
const SCALE = WIDTH / BOARDDIMENSION.width
const HEIGHT = Math.round(BOARDDIMENSION.height * SCALE)

export const CUSTOMCVDIMENSION = {
  WIDTH,
  HEIGHT,
  SCALE,
}
