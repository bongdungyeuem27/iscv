import { memo, useState } from 'react'
import { defaultStyle } from '../../config'
import styles from '../styles.module.scss'

function BoxItem({ id, data }) {
  return <div className={styles.componentText} style={defaultStyle(data)}></div>
}

export default memo(BoxItem)
