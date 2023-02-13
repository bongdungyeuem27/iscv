import React, { useState } from 'react'
import HeaderToolBox from './HeaderToolBox'
import styles from './styles.module.scss'
import LeftPanel from './LeftPanel'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Main from './Main'
import RightPanel from './RightPanel'
import CustomCVContextProvider from './CustomCVContext'

function Index() {
  return (
    <div className={styles.container}>
      <HeaderToolBox></HeaderToolBox>
      <LeftPanel></LeftPanel>
      <div className={styles.main}>
        <Main></Main>
      </div>
      <RightPanel></RightPanel>
    </div>
  )
}

function Wrapper() {
  return (
    <CustomCVContextProvider>
      <DndProvider backend={HTML5Backend}>
        <Index></Index>
      </DndProvider>
    </CustomCVContextProvider>
  )
}

export default Wrapper
