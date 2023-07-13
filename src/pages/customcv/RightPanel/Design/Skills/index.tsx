import React, { useState, useContext } from 'react'
import styles from './styles.module.scss'
import Select from 'react-select'
import clsx from 'clsx'
import { CustomCVContext } from '../../../CustomCVContext'
import { optionsFont, optionsFontWeight, optionsFontSize } from '../../../config'
import update from 'immutability-helper'
import { customStyles } from '../../../config'

export default function Skill() {
  const { list, setList, selected, cv } = useContext(CustomCVContext)
  return (
    <>
      {list[selected] && (
        <div className={styles.container}>
          <div className={styles.title}>Skills</div>
          <div className={styles.wrapper}>
            <Select
              styles={customStyles}
              menuPlacement="auto"
              value={list[selected].choosen}
              onChange={(e) => {
                setList(update(list, { [selected]: { $merge: { choosen: e } } }))
              }}
              options={(cv?.skills || [])?.map((item) => ({
                value: item?.title?.toLocaleLowerCase(),
                label: item?.title
              }))}
              //   onFocus={() => console.log('focus')}
              className={styles.font}
            />
          </div>
        </div>
      )}
    </>
  )
}
