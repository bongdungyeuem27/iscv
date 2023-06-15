import React from 'react'
import styles from './styles.module.scss'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import { IPFS_GATEWAY } from '@constants/index'
import { useSearchParams } from 'react-router-dom'
import { useGetBusinessQuery } from '@graphql/generated/schema'

type Props = {}
function Index({}: Props) {
  const employee = useSelector((state: RootState) => state.auth.employee)
  const current = useSelector((state: RootState) => state.messages.current)
  const [searchParams] = useSearchParams()
  const { data } = useGetBusinessQuery({
    variables: { businessId: Number(searchParams.get('business_id')) }
  })
  return (
    <div className={styles.container}>
      <div className={styles.icon}>
        <img src={`${IPFS_GATEWAY}${employee?.sourceImage}`}></img>
      </div>
      <div className={styles.text}>
        <div className={styles.name}>{data?.business?.name}</div>
        <div className={styles.message}>{'active now'}</div>
      </div>
    </div>
  )
}

export default Index
