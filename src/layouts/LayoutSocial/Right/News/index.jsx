import React from 'react'
import styles from './styles.module.scss'

function Index() {
  return (
    <div className={styles.item}>
      <div className={styles.topWrapper}>
        <div className={styles.iconWrapper}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrx2g0Te0nMkZFF7GMAJyidASiA6zS2VoDIg&usqp=CAU"></img>
        </div>
        <span className={styles.textWrapper}>
          <label>FPT</label>
          <p>asdasdasd</p>
        </span>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.accept}>Accept</button>
        <button className={styles.decline}>Decline</button>
      </div>
    </div>
  )
}

export default Index
