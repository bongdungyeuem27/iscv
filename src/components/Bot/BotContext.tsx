import { Dispatch, SetStateAction, createContext, useContext, useState } from 'react'

type IBotContext = {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const BotContext = createContext<IBotContext>({})

type Props = {
  children?: React.ReactNode
}
const BotContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  const data = {
    open,
    setOpen
  }
  return <BotContext.Provider value={data}>{children}</BotContext.Provider>
}

export default BotContextProvider
