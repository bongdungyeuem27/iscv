import React from 'react'
import styles from './styles.module.scss'
import { MoonLoader } from 'react-spinners'

function Contentloader() {
  return (
    <div className={styles.container}>
      <MoonLoader color="#36d7b7" />
    </div>
  )
}

export default Contentloader
