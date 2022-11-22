import React from 'react'
import styles from './styles.module.scss'
import ComponentGroup from './ComponentGroup'
import LayerGroup from './LayerGroup'

function Index() {
  return (
    <div className={styles.container}>
      <ComponentGroup></ComponentGroup>
      <LayerGroup></LayerGroup>
    </div>
  )
}

export default Index
