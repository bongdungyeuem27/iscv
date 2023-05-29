import React from 'react'
import styles from './styles.module.scss'

// Messages/Components/InfoItem/index
function Index({ onClick, children, icon }) {
  return (
    <div className={styles.container}>
      <button onClick={onClick} className={styles.icon}>
        <i className={icon}></i>
      </button>
      <div className={styles.fold}>{children}</div>
    </div>
  )
}

export default Index
