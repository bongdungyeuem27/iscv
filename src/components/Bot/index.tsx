import React, { useContext, useEffect, useState } from 'react'
import EventEmitter from 'events'
import { ReactComponent as BotIcon } from '@assets/bot.svg'
import styles from './styles.module.scss'
import './'
import Chat from './Chat'
import BotContextProvider, { BotContext } from './BotContext'
import Pop from './Pop/Pop'
type Props = {
  //
}

const Bot = (props: Props) => {
  const { open, setOpen } = useContext(BotContext)
 
  return (
    <div className=" fixed bottom-7 right-7 w-[75px] h-[75px] z-[900] flex justify-end items-end">
      <div className="relative w-full h-full">
        <Chat></Chat>
        <Pop></Pop>
        <div className={styles.container}>
          <button className={styles.btnCustom} onClick={() => setOpen?.(!open)}>
            <div className={styles.chatbot}>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
              <div className={styles.dot}></div>
            </div>
            <div className={styles.antenna}>
              <div className={styles.beam}></div>
              <div className={styles['beam-pulsar']}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

const Wrapper = () => {
  return (
    <BotContextProvider>
      <Bot></Bot>
    </BotContextProvider>
  )
}

export default Wrapper
