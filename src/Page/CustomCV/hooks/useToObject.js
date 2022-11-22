import { designTabComponents } from '../ItemTypes'

export default function index(value) {
  let data = JSON.parse(value)
  if (!data.autoCreatement || !data.list) return

  let temp = data.list
  let result = {}
  Object.keys(temp).map((id) => {
    result[id] = { ...designTabComponents[temp[id].type].data, ...temp[id] }
  })
  return {
    autoCreatement: data.autoCreatement,
    list: result,
  }
}
