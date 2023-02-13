import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import { ResizeableContainer } from '@component/Resizeable'
import clsx from 'clsx'
import generate from '@helper/generate'
import TabContextProvider, { TabContext } from './TabContext'
import { tabs } from './config'
import Tab from './Tab'
import Main from './Main'

const width = '300px'
function Index(props) {
  // const [dimension, setDimension] = useState()

  return (
    <ResizeableContainer
      dimension={{ left: 0, width: 400 }}
      resizeRight
      // setDimension={setDimension}
      active
      // minWidth={200}
      style={{
        position: 'fixed',
        zIndex: 7,
        top: 48,
        bottom: 0,
        minWidth: '350px'
      }}
    >
      <TabContextProvider>
        <div id="leftPanel" className={styles.container}>
          <div className={styles.tabs}>
            {Object.keys(tabs).map((key) => {
              return <Tab key={key} tabKey={key} name={tabs[key].name} icon={tabs[key].icon}></Tab>
            })}
          </div>

          <Main></Main>

          {/* <ComponentGroup></ComponentGroup>
        <LayerGroup></LayerGroup> */}
        </div>
      </TabContextProvider>
    </ResizeableContainer>
  )
}

export default Index
