import React, { useContext } from 'react'
import styles from './styles.module.scss'
import Skills from './Skills'
import Infos from './Infos'
import clsx from 'clsx'
import { Web3Context } from '@context/Web3ContextProvider'
import { useLocation } from 'react-router-dom'
function Index() {
  const location = useLocation()
  return (
    <>
      <div className={styles.container}>
        <Infos></Infos>
        {location.pathname.includes('profile') && <Skills></Skills>}
      </div>
    </>
  )
}

export default Index
