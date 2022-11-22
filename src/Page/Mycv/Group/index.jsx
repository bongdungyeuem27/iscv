import React from 'react'
import styles from './styles.module.scss'

function Index({ title, children, type }) {
  return (
    <div type={type} className={styles.container}>
      <div className={styles.title}>
        <div className={styles.info}>{title}</div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default Index
