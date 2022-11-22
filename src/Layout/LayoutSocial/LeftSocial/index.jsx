import React, { useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { SocialContext } from '@context/SocialContext'
import { useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Index() {
  const location = useLocation()
  const { t } = useTranslation('layout', { keyPrefix: 'social.index' })
  return (
    <div className={styles.container}>
      <Link
        to="/social"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/social' })}
      >
        <i className="fa-light fa-box-open-full"></i>
        <a>{t('feed')}</a>
      </Link>
      {/* <Link
        to="/friend"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/friend' })}
      >
        <i className="fa-light fa-user-group"></i>
        <a>{t('friend')}</a>
      </Link>
      <Link
        to="/follow"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/follow' })}
      >
        <i className="fa-light fa-check"></i>
        <a>{t('follow')}</a>
      </Link> */}
    </div>
  )
}

export default Index
