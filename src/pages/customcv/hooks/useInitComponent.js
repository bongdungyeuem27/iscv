import { designTabComponents } from '../ItemTypes'
import { capitalizeFirstLetter } from '@helper/string'
import { defaultComponent } from '../config'
export default function (
  type,
  top,
  left,
  getNewAutoCreatement,
  loginState,
  list,
  setList,
  setSelected
) {
  let newId = getNewAutoCreatement()
  let newData = {
    ...designTabComponents[type].data,
    top,
    left,
    type,
    name: capitalizeFirstLetter(type) + newId,
  }
  setList({ ...list, [newId]: newData })
  setSelected(newId)
}
