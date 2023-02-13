import React, { useState, useContext, memo, useEffect, useLayoutEffect } from 'react'
import styles from './styles.module.scss'
import { CustomCVContext } from '../../../../CustomCVContext'
import update from 'immutability-helper'

function Index(props) {
  const { index, id, name } = props
  const { list, setList, selected, setSelected, doubleClick, setDoubleClick } =
    useContext(CustomCVContext)

  const handleClick = (e) => {
    switch (e.detail) {
      case 1:
        break
      case 2:
        setDoubleClick(id)
        break
    }
  }
  const changeName = (e) => {
    setList(
      update(list, {
        [id]: {
          $merge: {
            name: e.target.value,
          },
        },
      })
    )
  }

  return (
    <>
      {doubleClick == id ? (
        <input className={styles.text} onChange={changeName} value={name}></input>
      ) : (
        <a onClick={handleClick} className={styles.text}>
          {name}
        </a>
      )}
    </>
  )
}

export default memo(Index)
