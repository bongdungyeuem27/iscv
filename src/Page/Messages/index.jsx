import React from 'react'
import styles from './styles.module.scss'
import People from './People'
import Chat from './Chat'
import Tools from './Tools'
import ChatContextProvider, { ChatContext } from './ChatContext'

function Index() {
  return (
    <section className={styles.container}>
      <People></People>
      <Chat></Chat>
      <Tools></Tools>
    </section>
  )
}

function Wrapper() {
  return (
    <ChatContextProvider>
      <Index></Index>
    </ChatContextProvider>
  )
}
export default Wrapper
