import { IMesssages } from '@redux/types/messages'
import clsx from 'clsx'
import styles from './styles.module.scss'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { IPFS_GATEWAY } from '@constants/index'
import { ERole } from 'src/types/messages'
type Props = {
  messages: IMesssages
}
function ChatItem({ messages }: Props) {
  const employee = useSelector((state: RootState) => state.auth.employee)
  const business = useSelector((state: RootState) => state.messages.recent).find(
    (x) => x.id === messages.businessId
  )
  return (
    <div className={clsx(styles.container, styles[messages.role])}>
      <div className={styles.info}>
        <div className={styles.icon}>
          <img
            src={`${IPFS_GATEWAY}${
              (messages.role === ERole.EMPLOYEE && employee?.sourceImage) ||
              (messages.role === ERole.BUSINESS && business?.sourceImage)
            }`}
          ></img>
        </div>
        <div className={styles.text}>
          <div className={styles.name}>
            {(messages.role === ERole.EMPLOYEE && employee?.name) ||
              (messages.role === ERole.BUSINESS && business?.name)}
          </div>
          <div className={styles.time}>{moment(new Date(messages.time)).format('HH:mm')}</div>
        </div>
      </div>

      <div className={styles.group}>
        <div className={styles.item}>
          <p>{messages.content}</p>
        </div>
      </div>
    </div>
  )
}

export default ChatItem
