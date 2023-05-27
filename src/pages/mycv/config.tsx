import MYCV from "./CVCustom";
import Default from "./Default";
import CVCustom from "./CVCustom";

export const routes = {
  default: {
    name: "default",
    element: <Default></Default>,
    to: "",
  },
  custom: {
    name: "custom",
    element: <CVCustom></CVCustom>,
    to: `?tab=custom`,
  },
};
