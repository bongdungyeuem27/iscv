import { Dispatch, SetStateAction, createContext, useState } from 'react'

type IContext = {
  searchShow?: boolean
  setSearchShow?: Dispatch<SetStateAction<boolean>>
}
export const ChatContext = createContext<IContext>({})

type Props = {
  children?: React.ReactNode
}

const ChatContextProvider = ({ children }: Props) => {
  const [searchShow, setSearchShow] = useState(false)

  const data = {
    searchShow,
    setSearchShow
  }
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>
}

export default ChatContextProvider
