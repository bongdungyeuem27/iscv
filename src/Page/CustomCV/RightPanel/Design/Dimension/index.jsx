import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import { CustomCVContext } from '../../../CustomCVContext'
import update from 'immutability-helper'

function Index() {
  const { list, selected, setList } = useContext(CustomCVContext)
  const handleChangeTop = (e) => {
    setList(update(list, { [selected]: { $merge: { top: e.target.value } } }))
  }
  const handleChangeLeft = (e) => {
    setList(update(list, { [selected]: { $merge: { left: e.target.value } } }))
  }
  const handleChangeWidth = (e) => {
    setList(update(list, { [selected]: { $merge: { width: e.target.value } } }))
  }
  const handleChangeHeight = (e) => {
    setList(update(list, { [selected]: { $merge: { height: e.target.value } } }))
  }
  const handleChangeBorderRadius = (e) => {
    setList(update(list, { [selected]: { $merge: { borderRadius: parseInt(e.target.value) } } }))
  }
  return (
    <>
      {list[selected] && (
        <div className={styles.container}>
          <div className={styles.title}>Dimensions</div>
          <div className={styles.wrapper}>
            <div className={styles.item}>
              <label htmlFor="x">X</label>
              <input
                type="number"
                name="x"
                id="x"
                value={list[selected].left}
                onChange={handleChangeLeft}
              ></input>
            </div>
            <div className={styles.item}>
              <label htmlFor="x">Y</label>
              <input
                type="number"
                name="x"
                id="x"
                value={list[selected].top}
                onChange={handleChangeTop}
              ></input>
            </div>
            <div className={styles.item}>
              <label htmlFor="x">W</label>
              <input
                type="number"
                name="x"
                id="x"
                value={list[selected].width}
                onChange={handleChangeWidth}
              ></input>
            </div>
            <div className={styles.item}>
              <label htmlFor="x">H</label>
              <input
                type="number"
                name="x"
                id="x"
                value={list[selected].height}
                onChange={handleChangeHeight}
              ></input>
            </div>

            <div className={styles.item}>
              <label htmlFor="x" className="fa-thin fa-border-top-left"></label>
              <input
                type="number"
                name="x"
                id="x"
                value={list[selected].borderRadius}
                onChange={handleChangeBorderRadius}
              ></input>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
