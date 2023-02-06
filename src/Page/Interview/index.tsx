import React, { useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Modal } from '@iscv/modal'

type Props = {}

const Interview = (props: Props) => {
  const [expandVolume, setExpandVolume] = useState(false)
  const [micro, setMicro] = useState(false)
  return (
    <main className={styles.container}>
      <div className={styles.left}>
        <div className={styles.header}>
          <h3>Lorem ipsum dolor sit amet</h3>
        </div>

        <div className={styles.invite}>
          <div className={styles.inviteLeft}>
            <div className={styles.inviteItem}>
              <i className="fa-regular fa-user-group"></i>
              <a>Invited to the call:</a>
              <div className={clsx(styles.inviteItemIndicator, styles.greenPositive)}>
                <div>6</div>
              </div>
            </div>
          </div>
          <div className={styles.inviteRight}>
            <button className={styles.inviteItem}>
              <div className={clsx(styles.inviteItemIndicator, styles.greenNegative)}>
                <i className="fa-regular fa-plus"></i>
              </div>
              <a className={styles.textGreen}>Add user to the call</a>
            </button>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.user}>
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
              alt="user"
            />
            <div className={styles.userInfo}>
              <div className={styles.userInfoProfessional}>Intern</div>
              <div className={styles.userInfoName}>Khanhle</div>
            </div>
          </div>
          <div className={styles.timer}>
            <div className={styles.record}></div>
            <div className={styles.time}>3:00</div>
          </div>

          <div
            className={clsx(
              styles.volume,
              expandVolume ? styles.volumeAdjust : styles.volumeExpand
            )}
          >
            <input type="range" name="volume"></input>

            <i className="fa-solid fa-volume" onClick={() => setExpandVolume(!expandVolume)}></i>
          </div>

          <div className={styles.toolBar}>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-expand"></i>
            </button>
            <button className={styles.toolItem} onClick={() => setMicro(!micro)}>
              <i className={clsx('fa-solid', micro ? 'fa-microphone' : 'fa-microphone-slash')}></i>
            </button>
            <button className={styles.finish}>
              <i className="fa-solid fa-check"></i>
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-screencast"></i>
            </button>
            <button className={styles.toolItem}>
              <i className="fa-solid fa-gear"></i>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.right}></div>
    </main>
  )
}

export default Interview
