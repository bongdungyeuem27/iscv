import clsx from 'clsx'
import React, { useContext, useEffect, useRef } from 'react'
import Top from './Top'
import { BotContext } from './BotContext'
import Main from './Main'

type Props = {
  className?: string
}

const Chat = (props: Props) => {
  const mainRef = useRef<any>(null)
  const { open, setOpen } = useContext(BotContext)

  return (
    <div
      ref={mainRef}
      className={clsx(
        ' fixed bottom-[20px] overflow-hidden shadow-2xl rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl z-101 right-[110px] transition-all duration-500 visible h-[400px] w-[300px] bg-white flex justify-start items-start flex-col',
        props.className,
        {
          [' !translate-y-[420px] !invisible']: open
        }
      )}
    >
      <Top></Top>
      <Main></Main>
    </div>
  )
}

export default Chat
