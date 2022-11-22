import React from 'react'
import styles from './styles.module.scss'
import ProfileOverview from './ProfileOverview'
import NewRequest from './NewRequest'
function Index() {
  return (
    <div className={styles.container}>
      <ProfileOverview></ProfileOverview>
      <NewRequest></NewRequest>
    </div>
  )
}

export default Index
