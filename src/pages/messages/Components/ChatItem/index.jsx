import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import Item from './Item'

//Messages/Components/ChatItem/index
function Index({ icon, profile, date, type, key, children }) {
  return (
    <div className={clsx(styles.container, styles[type])}>
      <div className={styles.info}>
        <div className={styles.icon}>
          <img src={profile.avatar}></img>
        </div>
        <div className={styles.text}>
          <div className={styles.name}> {profile.name}</div>
          <div className={styles.time}>{new Date(date).toLocaleTimeString()}</div>
        </div>
      </div>

      <div className={styles.group}>
        <Item key={key}>{children}</Item>
      </div>
    </div>
  )
}

export default Index
