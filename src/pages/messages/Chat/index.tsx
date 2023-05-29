import { useState } from "react";
import styles from "./styles.module.scss";

import messagesBackground from "@assets/messages_background.jpg";

import { useParams } from "react-router-dom";

import avatarDefault from "@assets/avatar.png";
import Top from "./Top";

import { ContentLoader } from "@components/ContentLoader";
import { useLocation } from "react-router-dom";

function Index() {
  const [profile, setProfile] = useState({ avatar: avatarDefault });
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const id = useParams().id ? parseInt(useParams().id!) : undefined;
  const [input, setInput] = useState();

  return (
    <div className={styles.container}>
      {profile && <Top profile={profile} id={id}></Top>}

      {isLoading ? (
        <div className={styles.content}>
          <ContentLoader></ContentLoader>
        </div>
      ) : (
        <>
          <div
            style={{ backgroundImage: `url(${messagesBackground})` }}
            className={styles.content}
          >
            <div className={styles.scroll}>
              {/* {list?.map((value, index) => {
                if (value.type) {
                  return (
                    <ChatItem
                      key={index}
                      date={value.date}
                      profile={loginState.profile}
                      type="owner"
                    >
                      {value.content}
                    </ChatItem>
                  );
                } else {
                  return (
                    <ChatItem
                      key={index}
                      date={value.date}
                      profile={profile}
                      type="guess"
                    >
                      {value.content}
                    </ChatItem>
                  );
                }
              })} */}
            </div>
          </div>
          <div className={styles.chatInput}>
            <div className={styles.chatType}>
              <textarea
                onChange={(e) => {
                  e.target.style.height = "inherit";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                  // setInput(e.target.value);
                }}
                value={input}
                rows={1}
                placeholder="Typing here ..."
              ></textarea>
            </div>
            <div
              onClick={() => {
                // handleSend(input);
                // setInput("");
              }}
              className={styles.chatSend}
            >
              <i className="fa-solid fa-paper-plane-top"></i>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Index;
