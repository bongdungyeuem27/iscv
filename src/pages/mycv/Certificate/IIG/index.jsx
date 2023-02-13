import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { getContract as getContractIIG } from '@contract/iigController'
import _ from 'lodash'
import Item from './Item'
import { SCOREMAX } from '@constant/iigConst'

function Index({ id }) {
  const [lr, setLr] = useState()
  const [sw, setSw] = useState()
  useEffect(() => {
    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListLRResultOfEmployee(id)
          .call()
          .then((success) => {
            let temp = success.map((value, index) => {
              return { ...value }
            })
            setLr(
              _.maxBy(temp, function (o) {
                return parseInt(o.listeningScore) + parseInt(o.readingScore)
              })
            )
          })

          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))

    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListSWResultOfEmployee(id)
          .call()
          .then((success) => {
            let temp = success.map((value, index) => {
              return { ...value }
            })
            setSw(
              _.maxBy(temp, function (o) {
                return parseInt(o.speakingScore) + parseInt(o.writingScore)
              })
            )
          })

          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])
  return (
    <div className={styles.container}>
      {(lr || sw) && <div className={styles.title}>IGG VietNam</div>}
      {lr && (
        <div className={styles.group}>
          <Item
            key={0}
            title={'Listening'}
            max={SCOREMAX.LISTENING}
            level={lr.listeningScore}
          ></Item>
          <Item key={1} title={'Reading'} max={SCOREMAX.READING} level={lr.readingScore}></Item>
        </div>
      )}
      {sw && (
        <div className={styles.group}>
          <Item key={2} title={'Speaking'} max={SCOREMAX.SPEAKING} level={sw.speakingScore}></Item>
          <Item key={3} title={'Writing'} max={SCOREMAX.WRITING} level={sw.writingScore}></Item>
        </div>
      )}
    </div>
  )
}

export default Index
