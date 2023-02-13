import React, { useLayoutEffect, useContext } from 'react'
import styles from './styles.module.scss'
import { BOARDDIMENSION } from '../config'
import Container from './Container'
import CustomDragLayer from './CustomDragLayer'
import update from 'immutability-helper'
import { CustomCVContext } from '../CustomCVContext'

function Index() {
  const { selected, selectedFor, setSelectedFor } = useContext(CustomCVContext)
  return (
    <div className={styles.index}>
      <Container snapToGrid={true} />
      <CustomDragLayer></CustomDragLayer>
    </div>
  )
}

export default Index
