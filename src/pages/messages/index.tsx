import Chat from './Chat'
import ChatContextProvider from './ChatContext'
import People from './People'
import Tools from './Tools'
import styles from './styles.module.scss'

function Index() {
  return (
    <main className={styles.container}>
      <div className="relative w-full flex">
        <People></People>
        <Chat></Chat>
        <Tools></Tools>
      </div>
    </main>
  )
}

function Messages() {
  return (
    <ChatContextProvider>
      <Index></Index>
    </ChatContextProvider>
  )
}
export default Messages
