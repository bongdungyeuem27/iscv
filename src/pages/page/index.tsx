import React from 'react'
import Left from './Left'
import Main from './Main'
import Right from './Right'
import styles from './styles.module.scss'

type Props = {}

const Profile = (props: Props) => {
  return (
    <div className={styles.container}>
      <Left></Left>
      <Main></Main>
      <Right></Right>
    </div>
  )
}

export default Profile
