import React from 'react'
import styles from './styles.module.scss'
import LeftSocial from './LeftSocial'
import RightSocial from './RightSocial'
import CenterSocial from './CenterSocial'
import PostsContextProvider from './PostsContext'
function Index() {
  return (
    <div className={styles.container}>
      <LeftSocial></LeftSocial>
      <CenterSocial></CenterSocial>
      <RightSocial></RightSocial>
    </div>
  )
}

function Wrapper() {
  return (
    <PostsContextProvider>
      <Index></Index>
    </PostsContextProvider>
  )
}

export default Wrapper
