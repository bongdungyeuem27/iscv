import React, { useState, useContext } from 'react'
import styles from './styles.module.scss'

import IIG from './IIG'
import { IIIG, IIIGLR, IIIGSW } from 'src/types/certificate/iig'
import { ICertificate } from 'src/types/certificate'

type Props = {
  id: number
  data: ICertificate
}

function Index({ id, data }: Props) {

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.time}></div>
      </div>

      <div className={styles.group}>
        {data.iig?.lr != null || (data.iig?.sw != null && <IIG id={id} data={data.iig}></IIG>)}
      </div>
    </div>
  )
}

export default Index
