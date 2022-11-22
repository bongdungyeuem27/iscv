import React, { useState, useLayoutEffect, useContext } from 'react'
import styles from './styles.module.scss'
import Modal from '@component/Modal'
import clsx from 'clsx'
import { awesome } from './dataFont'
import _ from 'lodash'
import { CustomCVContext } from '../../../CustomCVContext'
import update from 'immutability-helper'

function Index(props) {
  const { id } = props
  const [open, setOpen] = props.state
  const { setList, list } = useContext(CustomCVContext)
  const [search, setSearch] = useState('')

  const [solid, setSolid] = useState(true)
  const [regular, setRegular] = useState(false)
  const [light, setLight] = useState(false)
  const [thin, setThin] = useState(false)
  const [duotone, setDuotone] = useState(false)

  const [result, setResult] = useState()
  useLayoutEffect(() => {
    let temp = []
    _.forEach(awesome, (value, index) => {
      if (value.includes(search)) {
        temp.push(value)
      }
    })
    setResult(temp)
  }, [search])
  return (
    <Modal state={[open, setOpen]} top={'10%'} title={'icon selector'}>
      <div className={styles.container}>
        <div className={styles.search}>
          <div className={clsx('fa-regular fa-magnifying-glass', styles.icon)}></div>
          <input
            type="text"
            id="search_icon"
            value={search}
            placeholder="Search icon ..."
            onChange={(e) => {
              setSearch(e.target.value)
            }}
            name="search_icon"
          ></input>
        </div>
        <div className={styles.typeWrapper}>
          <div className={styles.type}>
            <div
              onClick={() => setSolid(!solid)}
              className={clsx('fa-solid fa-icons', styles.typeText, { [styles.active]: solid })}
            >
              Solid
            </div>
            <div
              onClick={() => setRegular(!regular)}
              className={clsx('fa-regular fa-icons', styles.typeText, { [styles.active]: regular })}
            >
              Regular
            </div>
            <div
              onClick={() => setLight(!light)}
              className={clsx('fa-light fa-icons', styles.typeText, { [styles.active]: light })}
            >
              Light
            </div>
            <div
              onClick={() => setThin(!thin)}
              className={clsx('fa-thin fa-icons', styles.typeText, { [styles.active]: thin })}
            >
              Thin
            </div>
            <div
              onClick={() => setDuotone(!duotone)}
              className={clsx('fa-duotone fa-icons', styles.typeText, { [styles.active]: duotone })}
            >
              Duotone
            </div>
          </div>
        </div>

        <div className={styles.resultWrapper}>
          <div className={styles.result}>
            {(() => {
              let resultTemp = search ? result : awesome
              let temp = []
              for (let i = 0; i < resultTemp.length; i++) {
                if (solid) temp.push('fa-solid ' + resultTemp[i])
                if (regular) temp.push('fa-regular ' + resultTemp[i])
                if (light) temp.push('fa-light ' + resultTemp[i])
                if (thin) temp.push('fa-thin ' + resultTemp[i])
                if (duotone) temp.push('fa-duotone ' + resultTemp[i])
              }
              return temp.map((value, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      setList(update(list, { [id]: { $merge: { icon: value } } }))
                      setOpen(false)
                    }}
                    className={clsx(value, styles.item)}
                  ></div>
                )
              })
            })()}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default Index
