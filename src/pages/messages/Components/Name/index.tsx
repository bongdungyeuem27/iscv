import React from 'react'
import styles from './styles.module.scss'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import { IPFS_GATEWAY } from '@constants/index'

type Props = {}
function Index({}: Props) {
  const employee = useSelector((state: RootState) => state.auth.employee)
  const current = useSelector((state: RootState) => state.messages.current)
  const business = useSelector((state: RootState) => state.messages.recent).find(
    (x) => x.id === current
  )
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={`${IPFS_GATEWAY}${employee?.sourceImage}`}></img>
      </div>
      <div className={styles.text}>
        <div className={styles.name}>{business?.name}</div>
        <div className={styles.message}>{'active now'}</div>
      </div>
    </div>
  )
}

export default Index
