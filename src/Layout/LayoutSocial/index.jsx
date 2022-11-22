import React, { useContext } from 'react'
import styles from './styles.module.scss'
import LeftSocial from './LeftSocial'
import RightSocial from './RightSocial'
import SocialContextProvider, { SocialContext } from '@context/SocialContext'
import CenterSocial from './CenterSocial'


function Index() {
  return (
    <section className={styles.container}>
      <LeftSocial></LeftSocial>
      <CenterSocial></CenterSocial>
      <RightSocial></RightSocial>
    </section>
  )
}

function Wrapper() {
  return (
    <SocialContextProvider>
      <Index></Index>
    </SocialContextProvider>
  )
}

export default Wrapper
