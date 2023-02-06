import React from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'

function Index(props) {
  const { title, level } = props
  return (
    <div className={styles.item}>
      <div className={styles.skillTextWrapper}>
        <label>{title}</label>
        <a>{level}%</a>
      </div>
      <ProgressBar percent={level}></ProgressBar>
    </div>
  )
}

export default Index
