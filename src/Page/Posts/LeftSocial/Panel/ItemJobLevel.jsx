import React from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'

function Index(props) {
  const { title, level, point } = props
  return (
    <div className={styles.item}>
      <div className={styles.skillTextWrapper}>
        <label>{title}</label>
        <a>{level}</a>
        <a>{point}</a>
      </div>
      {/* <ProgressBar percent={level}></ProgressBar> */}
    </div>
  )
}

export default Index
