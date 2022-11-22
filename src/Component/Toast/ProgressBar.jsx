import React, { useEffect, useState, memo, useRef } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

function ProgressBar(props) {
  const { totalTime, removeItem, nonDisplay } = props
  const ref = useRef()

  useEffect(() => {
    const handleEnd = () => {
      nonDisplay()
    }
    ref.current.addEventListener('animationend', handleEnd)
    return () => {
      ref && ref.current && ref.current.removeEventListener('animationend', () => {})
    }
  }, [])
  return (
    <div ref={ref} className={clsx(styles.progressBar)}>
      <span style={{ animationDuration: totalTime + 'ms' }}></span>
    </div>
  )
}

export default memo(ProgressBar)
