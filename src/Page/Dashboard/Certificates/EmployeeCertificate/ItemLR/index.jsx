import React from 'react'
import styles from '../styles.module.scss'

export default function Index({
  testDate,
  shiftTest,
  expireDate,
  listeningScore,
  readingScore,
  index,
}) {
  return (
    <tr className={styles.body}>
      <th className={styles.column1}>{index}</th>
      <th className={styles.column2}>{new Date(parseInt(testDate)).toLocaleDateString()}</th>
      <th className={styles.column3}>{shiftTest}</th>
      <th className={styles.column4}>{new Date(parseInt(expireDate)).toLocaleDateString()}</th>
      <th className={styles.column5}>{listeningScore}</th>
      <th className={styles.column6}>{readingScore}</th>
      <th className={styles.column7}>{parseInt(listeningScore) + parseInt(readingScore)}</th>
    </tr>
  )
}
