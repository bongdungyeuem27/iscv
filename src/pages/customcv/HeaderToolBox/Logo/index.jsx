import React from 'react'
import styles from './styles.module.scss'
import logo from '@asset/LogoCV.png'
import { Link } from 'react-router-dom'

function Index() {
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <img alt="logo" src={logo}></img>
      </Link>
    </div>
  )
}

export default Index
