import React, { useState, useContext } from 'react'
import styles from './styles.module.scss'

import IIG from './IIG'

function Index({id}) {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
       
        <div className={styles.time}></div>
      </div>

      <div className={styles.group}>
        <IIG id={id}></IIG>
      </div>
    </div>
  )
}

export default Index
