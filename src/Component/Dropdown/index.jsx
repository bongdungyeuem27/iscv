import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import handleClickOutside from '@helper/handleClickOutside'

export default function Index(props) {
  const { type, content, children } = props
  const [onShow, setOnShow] = props.state
  const wrapperRef = useRef(null)
  const toggleRef = useRef(null)
  useEffect(() => {
    handleClickOutside([wrapperRef.current, toggleRef.current], onShow, setOnShow)
  }, [wrapperRef.current, toggleRef.current, onShow])
  return (
    <div ref={toggleRef} className={styles.tooltip}>
      <div onClick={() => setOnShow(!onShow)}> {children || 'Button'}</div>

      {onShow && (
        <span
          ref={wrapperRef}
          className={clsx(styles.tooltipContent, type ? { [styles[type]]: true } : styles.bottom)}
        >
          {content}
        </span>
      )}
    </div>
  )
}
