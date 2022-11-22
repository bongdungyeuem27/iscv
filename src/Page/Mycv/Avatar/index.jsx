import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import QRCode from 'react-qr-code'
import avatarDefault from '@asset/avatar.png'
import { getAvatar } from '@api/employee/profile'

function Index({ id }) {
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    getAvatar(id)
      .then((success) => setAvatar(success))
      .catch((error) => console.log(error))
  })
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.round}>
          <img src={avatar || avatarDefault} className={styles.hexagon}></img>
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
