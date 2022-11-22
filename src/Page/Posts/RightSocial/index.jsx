import React, { useContext } from 'react'
import styles from './styles.module.scss'
import Todos from './Todos'
import { Web3Context } from '@context/Web3ContextProvider'
import { useParams, useLocation } from 'react-router-dom'

function Index() {
  const { loginState } = useContext(Web3Context)
  const id = useParams().id
  const location = useLocation()
  const owner = id == loginState.id
  return (
    <div className={styles.container}>
      {/* {location.pathname.includes('profile') && owner && loginState.for == 'employee' && (
        <Todos></Todos>
      )} */}
    </div>
  )
}

export default Index
