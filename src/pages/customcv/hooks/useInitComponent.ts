import { capitalizeFirstLetter } from "@helpers/string";
import { designTabComponents } from "../ItemTypes";
export default function (
  type: any,
  top: any,
  left: any,
  getNewAutoCreatement: any,
  list: any,
  setList: any,
  setSelected: any
) {
  let newId = getNewAutoCreatement();
  let newData = {
    ...designTabComponents[type].data,
    top,
    left,
    type,
    name: capitalizeFirstLetter(type) + newId,
  };
  setList({ ...list, [newId]: newData });
  setSelected(newId);
}
