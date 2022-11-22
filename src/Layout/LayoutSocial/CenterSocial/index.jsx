import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { SocialContext } from '@context/SocialContext'
import { Outlet } from 'react-router-dom'
function Index() {
  const { tab, setTab } = useContext(SocialContext)
  return (
    <div className={styles.container}>
      <Outlet></Outlet>
    </div>
  )
}

export default Index
