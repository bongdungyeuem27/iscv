import React from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'
function Item({ title, level, max }) {
  return (
    <div className={styles.item}>
      <div className={styles.itemTitle}>
        <div className={styles.title}>{title}</div>
        <a>
          {level}/{max}
        </a>
      </div>
      <ProgressBar percent={Math.round((parseInt(level) / max) * 100)}></ProgressBar>
    </div>
  )
}

export default Item
