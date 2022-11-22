import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { CustomCVContext } from '../../../CustomCVContext'
import clsx from 'clsx'
import update from 'immutability-helper'
import { customStyles, optionsObjectFitStyle } from '../../../config'
import Select from 'react-select'

function Index() {
  const { list, setList, selected } = useContext(CustomCVContext)
  return (
    <>
      {selected && (
        <div className={styles.container}>
          <div className={styles.title}>Image</div>
          <div className={styles.wrapper}>
            <div className={styles.row}>
              <div className={clsx(styles.item)}>
                <div>File</div>
                <input
                  type="file"
                  name="image"
                  accept="image/png, image/jpg, image/jpeg"
                  onChange={(e) => {
                    let reader = new FileReader()
                    reader.readAsDataURL(e.target.files[0])
                    reader.onload = function () {
                      setList(update(list, { [selected]: { $merge: { file: reader.result } } }))
                    }
                    reader.onerror = function (error) {
                      console.error('Error: ', error)
                    }
                  }}
                ></input>
                <i className={clsx('fa-thin fa-circle-xmark', styles.iconX)}></i>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.item}>
                <div>Object fit</div>
                <Select
                  styles={customStyles}
                  menuPlacement="auto"
                  value={list[selected].objectFit}
                  onChange={(e) => {
                    setList(update(list, { [selected]: { $merge: { objectFit: e } } }))
                  }}
                  options={optionsObjectFitStyle}
                  className={styles.objectFit}
                ></Select>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
