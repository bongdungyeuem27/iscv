import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

function Index({ percent, color, className }) {
  return (
    <div className={clsx(styles.progressBar, className)}>
      <span
        style={{
          '--percent': Math.round(percent) + '%',
          backgroundColor: color,
        }}
      ></span>
    </div>
  )
}

export default Index
