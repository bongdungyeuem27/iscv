import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { MatchedAnswer } from '@redux/types/interview'

type Props = {}

const Question = (props: Props) => {
  const answers = useSelector((state: RootState) => state.interview.answers)
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>
          Bạn sẽ có 5 lựa chọn 1 là không đồng ý, 2 là hơi đồng ý, 3 là trung lập, 4 là hơi đồng ý,
          5 là rất đồng ý. Bạn sẽ phải chọn 1 trong 5 con số.
        </p>
      </div>
      <div className={styles.content}>
        {answers.map((answer, index) => {
          return (
            <div key={index} className={clsx(styles.item, 'bg-blue-100 hover:bg-blue-300')}>
              <div className={styles.itemLeft}>
                <div className={styles.number}>{answer.question}</div>
                <span>{MatchedAnswer[answer.selected]}</span>
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
