import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { CustomCVContext } from '../CustomCVContext'
import Design from './Design'
import * as constant from './constant'

function Index() {
  const { leftTab, setLeftTab } = useContext(CustomCVContext)
  return (
    <div style={{ width: constant.panelWidth + 'px' }} className={styles.container}>
      <div className={styles.tabContainer}>
        <div
          onClick={() => setLeftTab(0)}
          className={clsx(styles.tab, { [styles.active]: leftTab == 0 })}
        >
          Tab
        </div>
        <div
          onClick={() => setLeftTab(1)}
          className={clsx(styles.tab, { [styles.active]: leftTab == 1 })}
        >
          Tab
        </div>
        <div
          onClick={() => setLeftTab(2)}
          className={clsx(styles.tab, { [styles.active]: leftTab == 2 })}
        >
          Tab
        </div>
      </div>
      {leftTab == 0 && <Design></Design>}
    </div>
  )
}

export default Index
