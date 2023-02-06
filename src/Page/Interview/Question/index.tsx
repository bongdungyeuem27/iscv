import React from 'react'
import styles from './styles.module.scss'

type Props = {}

const Question = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h3>Questions</h3>
        <span>View all</span>
      </div>
      <div className={styles.content}>
        {[...Array(7)].map((question, index) => {
          return (
            <div key={index} className={styles.item}>
              <div className={styles.itemLeft}>
                <div className={styles.number}>{index}</div>
                <span>AAAAAAA</span>
              </div>
              <div className={styles.itemRight}></div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Question
