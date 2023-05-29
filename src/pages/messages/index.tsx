import Chat from "./Chat";
import ChatContextProvider from "./ChatContext";
import People from "./People";
import Tools from "./Tools";
import styles from "./styles.module.scss";

function Index() {
  return (
    <main className={styles.container}>
      <People></People>
      <Chat></Chat>
      <Tools></Tools>
    </main>
  );
}

function Messages() {
  return (
    <ChatContextProvider>
      <Index></Index>
    </ChatContextProvider>
  );
}
export default Messages;
