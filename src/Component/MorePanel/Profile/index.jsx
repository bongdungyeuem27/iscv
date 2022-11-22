import React, { useContext, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Web3Context } from '@context/Web3ContextProvider'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Index(props) {
  const { t } = useTranslation('component', { keyPrefix: 'morePanel.index' })
  const { showMorePanel, setShowMorePanel, dispatchLogin, loginState } = useContext(Web3Context)
  const navigate = useNavigate()
  const handleLogout = () => {
    if (loginState.for == 'employee') dispatchLogin({ type: 'employee_logout' })
    if (loginState.for == 'business') dispatchLogin({ type: 'business_logout' })
    setShowMorePanel((e) => {
      return { ...e, show: false }
    })
    navigate('/')
  }
  return (
    <div className={clsx(styles.container)}>
      <Link
        onClick={() => {
          setShowMorePanel((e) => {
            return { ...e, show: false }
          })
        }}
        to={
          loginState.for == 'employee'
            ? `/profile/${loginState.id}`
            : loginState.for == 'business' && `/page/${loginState.id}`
        }
        className={styles.item}
      >
        <i className="fa-solid fa-circle-heart"></i>
        <p>{t('my_page')}</p>
      </Link>
      {loginState.for == 'business' && (
        <Link
          onClick={() => {
            setShowMorePanel((e) => {
              return { ...e, show: false }
            })
          }}
          to="/dashboard"
          className={styles.item}
        >
          <i className="fa-regular fa-grid-horizontal"></i>
          <p>{t('dashboard')}</p>
        </Link>
      )}
      <div className={styles.item}>
        <i className="fa-solid fa-bookmark"></i>
        <p>{t('saved')}</p>
      </div>
      <Link
        to="/setting?tab=account"
        onClick={() => {
          setShowMorePanel((e) => {
            return { ...e, show: false }
          })
        }}
        className={styles.item}
      >
        <i className="fa-solid fa-gear"></i>
        <p>{t("setting")}</p>
      </Link>
      <div onClick={handleLogout} className={styles.item}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <p>{t('logout')}</p>
      </div>
    </div>
  )
}

export default Index
