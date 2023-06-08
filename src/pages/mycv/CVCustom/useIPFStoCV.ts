import { designTabComponents } from "@pages/customcv/ItemTypes";

export default function index(data: any) {
  if (!data.autoCreatement || !data.list) return;

  const temp = data.list;
  const result: { [key: string]: any } = {};
  Object.keys(temp).map((id) => {
    result[id] = { ...designTabComponents[temp[id].type].data, ...temp[id] };
  });
  return result;
}
