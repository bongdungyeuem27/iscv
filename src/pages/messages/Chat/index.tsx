import { useState } from "react";
import styles from "./styles.module.scss";

import messagesBackground from "@assets/messages_background.jpg";

import { useParams } from "react-router-dom";

import Top from "./Top";

import { RootState } from "@redux/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ChatItem from "../Components/ChatItem";
import TextInput from "./TextInput";

function Chat() {
  const employee = useSelector((state: RootState) => state.auth.employee);

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id ? parseInt(useParams().id!) : undefined;

  const list = useSelector((state: RootState) => state.messages.list);
  return (
    <div className={styles.container}>
      {employee && <Top profile={employee} id={id}></Top>}

      <div
        style={{ backgroundImage: `url(${messagesBackground})` }}
        className={styles.content}
      >
        <div className={styles.scroll}>
          {list?.map((value) => {
            return <ChatItem key={value._id} messages={value}></ChatItem>;
          })}
        </div>
      </div>
      <TextInput></TextInput>
    </div>
  );
}

export default Chat;
