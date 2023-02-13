import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
export default function Tooltip(props) {
  const { type, content, children } = props
  return (
    <div className={styles.tooltip}>
      {children || 'Button'}
      <span className={clsx(styles.tooltipContent, type ? { [styles[type]]: true } : styles.bottom)}>
        {content}
      </span>
    </div>
  )
}
