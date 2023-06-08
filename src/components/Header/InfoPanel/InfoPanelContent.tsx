'use client'
import clsx from 'clsx'
import { useContext, useEffect } from 'react'
import { InfoPanelContext } from './InfoPanelContext'
import styles from './styles.module.scss'
import Profile from './Profile/index'
import Notification from './Notification/index'

type Props = {}

export const InfoPanelContent = (props: Props) => {
  const { panelRef, showInfoPanel, setShowInfoPanel } = useContext(InfoPanelContext)
  useEffect(() => {
    function handleClickOutside(event: any) {
      const data = [panelRef?.current, ...Array.from(document.querySelectorAll('[id=header_button]'))]
      if (!showInfoPanel?.show) return

      let yes = true
      for (let i = 0; i < data.length; i++) {
        if ((data as Element[])[i].contains(event.target)) yes = false
      }
      if (yes) {
        setShowInfoPanel &&
          setShowInfoPanel!((e) => {
            return { ...e, show: false }
          })
      }
    }
    if (panelRef) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [panelRef, showInfoPanel])

  return (
    <div ref={panelRef} className={clsx(styles.container, { [styles.show]: showInfoPanel?.show })}>
      {showInfoPanel?.panel == 1 && <Profile></Profile>}
      {showInfoPanel?.panel == 2 && <Notification></Notification>}
    </div>
  )
}
