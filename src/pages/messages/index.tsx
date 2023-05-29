import React from "react";
import styles from "./styles.module.scss";
import People from "./People";
import Chat from "./Chat";
import Tools from "./Tools";
import ChatContextProvider, { ChatContext } from "./ChatContext";

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
