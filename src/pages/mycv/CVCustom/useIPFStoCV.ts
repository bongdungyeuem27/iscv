import { designTabComponents } from "@pages/customcv/ItemTypes";

export default function index(data: any) {
  if (!data.autoCreatement || !data.list) return;

  let temp = data.list;
  let result: { [key: string]: any } = {};
  Object.keys(temp).map((id) => {
    result[id] = { ...designTabComponents[temp[id].type].data, ...temp[id] };
  });
  return result;
}
