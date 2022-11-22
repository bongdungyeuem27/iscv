import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

function Index({ onChange, value, onKeyDown }) {
  return (
    <label className={styles.container}>
      <div className={styles.iconSearch}>
        <i className={clsx('fa-light fa-magnifying-glass')}></i>
      </div>

      <input
        className={styles.textInput}
        type="text"
        onChange={onChange}
        value={value}   
        onKeyDown={onKeyDown}
      ></input>
      {value && (
        <div className={styles.boxClose}>
          <i className="fa-regular fa-xmark"></i>
        </div>
      )}
      <div className={styles.filterBox}>
      <i className="fa-light fa-filter"></i>
      </div>
    </label>
  )
}

export default Index
