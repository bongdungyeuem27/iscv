import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Props = {
  initialMinute?: number
  initialSeconds?: number
  onStart?: () => void
  onEnd?: () => void
}

const Timer = (props: Props) => {
  const { initialMinute = 0, initialSeconds = 0 } = props
  const [minutes, setMinutes] = useState(initialMinute)
  const [seconds, setSeconds] = useState(initialSeconds)

  useEffect(() => {
    setMinutes(initialMinute)
    setSeconds(initialSeconds)
  }, [initialMinute, initialSeconds])

  useEffect(() => {
    const myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval)
          props.onEnd?.()
        } else {
          setMinutes(minutes - 1)
          setSeconds(59)
        }
      }
    }, 1000)

    return () => {
      clearInterval(myInterval)
    }
  }, [minutes, seconds, props.onEnd])

  return (
    <div className={styles.timer}>
      <div className={styles.record}></div>
      <div className={styles.time}>
        {minutes === 0 && seconds === 0 ? null : (
          <span>
            {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
          </span>
        )}
      </div>
    </div>
  )
}

export default Timer
