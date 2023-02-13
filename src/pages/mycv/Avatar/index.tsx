import avatarDefault from '@assets/avatar.png'
import { IPFS_GATEWAY } from '@constants/index'
import QRCode from 'react-qr-code'
import styles from './styles.module.scss'

function Index({ id, cid }: { id: number; cid: string }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.round}>
          <img src={`${IPFS_GATEWAY}${cid}` ?? avatarDefault}></img>
        </div>
      </div>
      <div className={styles.qr}>
        <div className={styles.qrItem}>
          <QRCode
            size={80}
            style={{ height: '80px', maxWidth: '100%', width: '100%' }}
            value={`${window.location.origin}/profile/${id}`}
          />
        </div>
      </div>
    </div>
  )
}

export default Index
