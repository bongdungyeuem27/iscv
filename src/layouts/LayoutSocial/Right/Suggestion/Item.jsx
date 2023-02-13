import React from 'react'
import styles from './styles.module.scss'
import icon from '@asset/avatar_men.png'

function Index() {
  return (
    <div className={styles.item}>
      <div className={styles.iconTextWrapper}>
        <img src={icon}></img>
        <div className={styles.textWrapper}>
          <div className={styles.title}>
            <a>KMS</a>
            <div className={styles.follow}>Follow</div>
          </div>
          <div className={styles.content}>
            Dang can tuyen 1 fresher 

          </div>
        </div>
      </div>
      <div className={styles.moreInfo}>
        <i className="fa-solid fa-paper-plane-top"></i>
      </div>
    </div>
  )
}

export default Index
