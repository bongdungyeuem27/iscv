import React, { useState, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import handleClickOutside from '@helper/handleClickOutside'
import clsx from 'clsx'

function Index(props) {
  const { children } = props
  const ref = useRef()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    handleClickOutside([ref?.current], open, setOpen)
  }, [ref, open])
  return (
    <span ref={ref} className={styles.container}>
      <a className={styles.toggle} onClick={() => setOpen(!open)}>
        <i className="fa-regular fa-ellipsis"></i>
      </a>

      <div className={clsx(styles.menu, { [styles.open]: open })}>
        <div className={styles.content}>
          <div className={styles.item}>Lorem ipsum dolor sit am</div>
          <div className={styles.item}>Lorem ipsum dolor sit am</div>
          <div className={styles.item}>Lorem ipsum dolor sit am</div>
          <div className={styles.item}>Lorem ipsum dolor sit am</div>
        </div>
      </div>
    </span>
  )
}

export default Index
