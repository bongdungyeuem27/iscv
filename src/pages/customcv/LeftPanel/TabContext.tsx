import { Dispatch, SetStateAction, createContext, useState } from "react";
import { tabs } from "./config";

export type IContext = {
  tab?: string;
  setTab?: Dispatch<SetStateAction<string>>;
};

export const TabContext = createContext({});

export type Props = {
  children?: React.ReactNode;
};
const TabContextProvider = ({ children }: Props) => {
  const [tab, setTab] = useState(Object.keys(tabs)[0]);
  const data = { tab, setTab };

  return <TabContext.Provider value={data}>{children}</TabContext.Provider>;
};

export default TabContextProvider;
