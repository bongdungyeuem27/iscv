import { createContext } from "react";
import io from "socket.io-client";

import { useParams } from "react-router-dom";
import { API_ENDPOINT_NODEJS } from "@constants/index";

type IContext = {};
export const ChatContext = createContext<IContext>({});

type Props = {
  children?: React.ReactNode;
};

const ChatContextProvider = ({ children }: Props) => {
  const id = useParams().id ? parseInt(useParams()?.id!) : undefined;

  const data = {};
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>;
};

export default ChatContextProvider;
