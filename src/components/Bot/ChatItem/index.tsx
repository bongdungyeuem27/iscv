import { EBotCategory, IBotMessages } from '@redux/types/bot'
import clsx from 'clsx'
import styles from './styles.module.scss'
type Props = {
  messages: IBotMessages
}
function ChatItem({ messages }: Props) {
  return (
    <div className={clsx(styles.container, styles[messages.role])}>
      <div className={styles.group}>
        <div className={styles.item}>
          <p>{messages.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
