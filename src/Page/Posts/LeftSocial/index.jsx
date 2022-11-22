import React, { useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import SkillsPanel from './SkillsPanel'
import IIGRequestPanel from './IIGRequestPanel'
import { Web3Context } from '@context/Web3ContextProvider'
import { CATEGORY } from '@constant/businessConst'
import { PostsContext } from '../PostsContext'
import { useLocation } from 'react-router-dom'
function Index() {
  const { profile } = useContext(PostsContext)
  const { loginState } = useContext(Web3Context)
  const location = useLocation()
  return (
    <div className={styles.container}>
      {location.pathname.includes('profile') && <SkillsPanel></SkillsPanel>}
      {location.pathname.includes('page') &&
        loginState.for == 'employee' &&
        profile?.category == CATEGORY.igg.type && <IIGRequestPanel></IIGRequestPanel>}
    </div>
  )
}

export default Index
