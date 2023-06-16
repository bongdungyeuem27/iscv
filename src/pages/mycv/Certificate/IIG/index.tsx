import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'

import _ from 'lodash'
import Item from './Item'
import { SCOREMAX } from '@constants/iigConst'
import { IIIG, IIIGLR, IIIGSW } from 'src/types/certificate/iig'

type Props = {
  id: number
  data: IIIG
}

function Index({ id, data }: Props) {
  return (
    <div className={styles.container}>
      {<div className={styles.title}>IGG VietNam</div>}
      {data.lr?.id != null && (
        <div className={styles.group}>
          <Item
            key={0}
            title={'Listening'}
            max={SCOREMAX.LISTENING}
            level={data.lr?.listeningScore!}
          ></Item>
          <Item
            key={1}
            title={'Reading'}
            max={SCOREMAX.READING}
            level={data.lr?.readingScore!}
          ></Item>
        </div>
      )}
      {data.sw?.id != null && (
        <div className={styles.group}>
          <Item
            key={2}
            title={'Speaking'}
            max={SCOREMAX.SPEAKING}
            level={data.sw.speakingScore!}
          ></Item>
          <Item
            key={3}
            title={'Writing'}
            max={SCOREMAX.WRITING}
            level={data.sw.writingScore!}
          ></Item>
        </div>
      )}
    </div>
  )
}

export default Index
