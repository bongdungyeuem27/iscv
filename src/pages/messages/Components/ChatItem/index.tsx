import { IMesssages } from "@redux/types/messages";
import clsx from "clsx";
import styles from "./styles.module.scss";
import moment from "moment";
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";
import { IPFS_GATEWAY } from "@constants/index";
type Props = {
  messages: IMesssages;
};
function ChatItem({ messages }: Props) {
  const sourceImage = useSelector(
    (state: RootState) => state.auth.employee
  )?.sourceImage;
  return (
    <div className={clsx(styles.container, styles[messages.role])}>
      <div className={styles.info}>
        <div className={styles.icon}>
          <img src={`${IPFS_GATEWAY}${sourceImage}`}></img>
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{"profile.name"}</div>
          <div className={styles.time}>
            {moment(new Date(messages.time)).format("HH:mm")}
          </div>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.item}>
          <p>{messages.content}</p>
        </div>
      </div>
    </div>
  );
}

export default ChatItem;
