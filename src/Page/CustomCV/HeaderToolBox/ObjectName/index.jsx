import React, { useContext, useLayoutEffect, useState } from 'react'
import styles from '../styles.module.scss'
import { CustomCVContext } from '../../CustomCVContext'

function Index() {
  const { list, selected } = useContext(CustomCVContext)
  return <div className={styles.target}>
    <p>{list?.selected?.name}</p>
  </div>
}

export default Index
