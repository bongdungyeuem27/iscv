'use client'
import clsx from 'clsx'

import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// import { useEmployeeContract } from "@contracts/index";
import { signout } from '@redux/reducers/auth'
import { RootState } from '@redux/store'
import { InfoPanelContext } from '../InfoPanelContext'
import styles from './styles.module.scss'

import { useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

type Props = {}

function Profile(props: Props) {
  const signer = useSelector((state: RootState) => state.auth.signer)
  const employee = useSelector((state: RootState) => state.auth.employee)
  const { t, i18n } = useTranslation('component', {
    keyPrefix: 'morePanel.index'
  })
  const { setShowInfoPanel } = useContext(InfoPanelContext)
  const dispatch = useDispatch()

  // const handleSignout = () => {
  //   setShowInfoPanel!((e) => {
  //     return { ...e, show: false }
  //   })
  //   dispatch(signout({}))
  // }
  return (
    <ul className={clsx(styles.container)}>
      <Link
        onClick={() => {
          setShowInfoPanel!((e) => {
            return { ...e, show: false }
          })
        }}
        to={`/profile/${employee?.id}`}
        className={styles.item}
      >
        <i className="fa-solid fa-circle-heart"></i>
        <p>{t('my_page')}</p>
      </Link>
      {/* {loginState.for == "business" && (
        <Link
          onClick={() => {
            setShowMorePanel((e) => {
              return { ...e, show: false };
            });
          }}
          to="/dashboard"
          className={styles.item}
        >
          <i className="fa-regular fa-grid-horizontal"></i>
          <p>{t("dashboard")}</p>
        </Link>
      )} */}
      <a className={styles.item}>
        <i className="fa-solid fa-bookmark"></i>
        <p>{t('saved')}</p>
      </a>
      {/* <Link
        to="aaa"
        onClick={() => {
          setShowInfoPanel!((e) => {
            return { ...e, show: false }
          })
        }}
        className={styles.item}
      >
        <i className="fa-solid fa-gear"></i>
        <p>{t('setting')}</p>
      </Link> */}
      {/* <a onClick={handleSignout} className={styles.item}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <p>{t("logout")}</p>
      </a> */}
    </ul>
  )
}

export default Profile
