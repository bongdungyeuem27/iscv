import { memo, useState } from 'react'
import { defaultStyle, defaultImageStyle } from '../../config'
import styles from '../styles.module.scss'

function ImageItem({ id, data }) {
  return (
    <>
      {data.file ? (
        <img
          className={styles.componentImage}
          style={{ ...defaultImageStyle(data) }}
          src={data.file}
        ></img>
      ) : (
        <div className={styles.componentImage}>
          <i className="fa-thin fa-image"></i>
        </div>
      )}
    </>
  )
}

export default memo(ImageItem)
