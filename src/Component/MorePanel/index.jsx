import React, { useContext, useRef, useEffect, useLayoutEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Web3Context } from '@context/Web3ContextProvider'
import clsx from 'clsx'
import _ from 'lodash'
import Profile from './Profile'
import Notification from './Notification'


export const Index = (props) => {
  const { showMorePanel, setShowMorePanel } = useContext(Web3Context)
  const ref = useRef()

  useEffect(() => {
    function handleClickOutside(event) {
      let data = [ref.current, ...Array.from(document.querySelectorAll('[id=header_button]'))]
      if (!showMorePanel.show) return

      var yes = true
      for (let i = 0; i < data.length; i++) {
        if (data[i].contains(event.target)) yes = false
      }
      if (yes)
        setShowMorePanel((e) => {
          return { ...e, show: false }
        })
    }
    if (ref) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref, showMorePanel])
  return (
    <div ref={ref} className={clsx(styles.container, { [styles.show]: showMorePanel.show })}>
      {showMorePanel.panel == 1 && <Profile></Profile>}
      {showMorePanel.panel == 2 && <Notification></Notification>}
    </div>
  )
}
