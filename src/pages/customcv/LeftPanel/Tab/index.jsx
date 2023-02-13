import React, { useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { TabContext } from '../TabContext'

function Index({ tabKey, name, icon }) {
  const { tab, setTab } = useContext(TabContext)
  return (
    <div
      className={styles.container}
      onClick={() => {
        setTab(tabKey)
      }}
    >
      <div className={clsx('fa-light', icon, styles.icon)}></div>
      <span className={styles.name}>{name}</span>
    </div>
  )
}

export default Index
