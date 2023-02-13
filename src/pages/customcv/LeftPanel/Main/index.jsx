import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { TabContext } from '../TabContext'
import { tabs } from '../config'

function Index() {
  const { tab } = useContext(TabContext)
  return <div className={styles.container}>{tabs[tab].elements}</div>
}

export default Index
