import { designTabComponents } from "../ItemTypes";

export default function index(value: string) {
  const data = JSON.parse(value);
  if (!data.autoCreatement || !data.list) return;

  const temp = data.list;
  const result: { [key: string]: any } = {};
  Object.keys(temp).map((id) => {
    result[id] = { ...designTabComponents[temp[id].type].data, ...temp[id] };
  });
  return {
    autoCreatement: data.autoCreatement,
    list: result,
  };
}
