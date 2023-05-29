import React from 'react'
import styles from './styles.module.scss'

function Index({ title, info, avatar }) {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={avatar}></img>
      </div>
      <div className={styles.text}>
        <div className={styles.name}>{title}</div>
        <div className={styles.message}>{info}</div>
      </div>
    </div>
  )
}

export default Index
