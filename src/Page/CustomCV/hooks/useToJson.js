import { designTabComponents } from '../ItemTypes'
import _ from 'lodash'
export default function index(autoCreatement, list) {
  let temp = structuredClone(list)
  let result = {}
  Object.keys(temp).map((id) => {
    let type = temp[id].type
    let item = temp[id]
    Object.keys(item).forEach((key) => {
      if (_.isEqual(item[key], designTabComponents[type].data[key])) delete item[key]
    })
    result[id] = item
  })
  return { autoCreatement, list: result }
}
