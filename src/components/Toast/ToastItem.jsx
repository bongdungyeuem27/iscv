import React, { useEffect, useRef, useState, useMemo, memo, useCallback, useReducer } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import Progressbar from './ProgressBar'
import { eventEmitter } from './ToastContainer'
import * as constants from './constants'
import { useTranslation } from 'react-i18next'

function ToastItem(props) {
  const [display, setDisplay] = useState(true)
  const { t } = useTranslation('component', { keyPrefix: 'toast.index' })
  const ref = useRef()
  const { type, message, id, time, closeOnClick, pauseOnHover } = props
  useEffect(() => {
    eventEmitter.on('removeItemFromContainer' + id, () => {
      setDisplay(false)
    })
  }, [])
  const handleEnd = useCallback(() => {
    eventEmitter.removeListener('removeItemFromContainer' + id, () => {})
    eventEmitter.emit('removeItem', id)
  }, [])
  useEffect(() => {
    if (!display) {
      ref?.current?.addEventListener('animationend', handleEnd)
    }
    return () => {
      ref?.current?.removeEventListener('animationend', () => {})
    }
  }, [display])

  return (
    <div
      ref={ref}
      className={clsx(styles.container, {
        [styles.pauseOnHover]: pauseOnHover,
        [styles.displayNone]: !display,
      })}
    >
      <div
        onClick={() => {
          closeOnClick && setDisplay(false)
        }}
        className={clsx(styles.notificationsItem, styles[type])}
      >
        <div className={styles.notificationContent}>
          {type === constants.SUCCESS && (
            <div className={styles.icon}>
              <div className={styles.iconRound}>
                <i className={clsx('fa-solid fa-check')}></i>
              </div>
            </div>
          )}

          {type === constants.INFO && (
            <div className={styles.icon}>
              <div className={styles.iconRound}>
                <i className="fa-solid fa-bell"></i>
              </div>
            </div>
          )}
          {type === constants.WARNING && (
            <div className={styles.icon}>
              <div className={styles.iconRound}>
                <i className="fa-solid fa-bell-on"></i>
              </div>
            </div>
          )}
          {type === constants.ERROR && (
            <div className={styles.icon}>
              <div className={styles.iconRound}>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
            </div>
          )}
          <a className={styles.text}>
            {!message || message == type.toString() ? t(type) : message}
          </a>
          <button
            onClick={() => {
              setDisplay(false)
            }}
            className={styles.buttonClose}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <Progressbar
          totalTime={time ? time : 3000}
          id={id}
          nonDisplay={() => setDisplay(false)}
        ></Progressbar>
      </div>
    </div>
  )
}

export default memo(ToastItem)
