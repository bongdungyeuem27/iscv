import React from 'react'
import styles from './styles.module.scss'

function Item({children}) {
  return (
    <div className={styles.item}>
      <p>{children}</p>
    </div>
  )
}

export default Item
