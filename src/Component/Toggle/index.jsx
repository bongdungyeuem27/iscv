import React, { useState } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'

function Index(props) {
  const { positiveColor, negativeColor } = props
  const [checked, setChecked] = props.state
  return (
    <label onClick={() => setChecked(!checked)} className={styles.switch}>
      <span
        style={{ background: checked ? positiveColor : negativeColor }}
        className={clsx(styles.slider, { [styles.checked]: checked })}
      ></span>
    </label>
  )
}

export default Index
