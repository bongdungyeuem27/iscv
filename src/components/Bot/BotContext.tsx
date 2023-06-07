import EventEmitter from 'events'
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react'

type IBotContext = {
  open?: boolean
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export const BotContext = createContext<IBotContext>({})

type Props = {
  children?: React.ReactNode
}

export const botListener = new EventEmitter()

const BotContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    botListener.on('open', () => {
      setOpen(true)
    })
  }, [])
  const data = {
    open,
    setOpen
  }
  return <BotContext.Provider value={data}>{children}</BotContext.Provider>
}

export default BotContextProvider
