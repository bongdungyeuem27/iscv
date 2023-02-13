'use client'
import { useQuery } from '@apollo/client'
import avatar from '@assets/avatar.png'
import { EmployeeByUserData, getEmployeeByUser } from '@graphql/Employee'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { IPFS_GATEWAY } from '@constants/index'
import { connect } from '@redux/reducers/auth'
import { RootState } from '@redux/store'
import { useTranslation } from 'react-i18next'
import { InfoPanelContext } from './InfoPanelContext'
import styles from './styles.module.scss'

type Props = {}

const ButtonProfile = (props: Props) => {
  const { t, i18n } = useTranslation('component', { keyPrefix: 'header.index' })
  const { showInfoPanel, setShowInfoPanel } = useContext(InfoPanelContext)
  const dispatch = useDispatch()
  const provider = useSelector((state: RootState) => state.auth.provider)
  const account = useSelector((state: RootState) => state.auth.account)
  const handleConnect = () => {
    dispatch<any>(connect({ provider }))
  }
  const { loading, error, data, refetch, subscribeToMore } = useQuery<EmployeeByUserData>(
    getEmployeeByUser,
    {
      variables: { user: account },
    }
  )
  return (
    <div>
      {!account && (
        <button className={styles.buttonAccount} onClick={handleConnect}>
          {t('connect_metamask')}
        </button>
      )}
      {account && !data?.employeeByUser && (
        <Link to={'/register'} className={styles.buttonAccount}>
          {t('register')}
        </Link>
      )}

      {account && data?.employeeByUser && (
        <button
          id="header_button"
          onClick={() => {
            setShowInfoPanel!((e) => {
              return {
                show: e.show == false ? true : e.panel != 1 ? true : false,
                panel: 1,
              }
            })
          }}
          key={4}
          className={styles.account}
        >
          <img
            className={styles.avatar}
            src={
              data?.employeeByUser?.sourceImage
                ? `${IPFS_GATEWAY}${data?.employeeByUser?.sourceImage}`
                : avatar
            }
            loading="eager"
            alt="avatar"
          ></img>
        </button>
      )}
    </div>
  )
}

export default ButtonProfile
