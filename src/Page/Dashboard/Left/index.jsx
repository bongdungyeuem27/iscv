import React, { useEffect, useState, useContext } from 'react'
import styles from './styles.module.scss'
import { Link, useSearchParams } from 'react-router-dom'
import clsx from 'clsx'
import avatarDefault from '@asset/avatar.png'
import { useTranslation } from 'react-i18next'
import { getAvatar } from '@api/business/profile'
import { Web3Context } from '@context/Web3ContextProvider'
import { routes } from '../config'
function Index() {
  const { loginState } = useContext(Web3Context)
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.index' })
  const [searchParams] = useSearchParams()
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    getAvatar(loginState.id)
      .then((success) => setAvatar(success))
      .catch((error) => console.error(error))
  }, [])
  const tab = searchParams.get('tab')

  const active = routes[tab] ? tab : 'main'

  return (
    <div className={styles.container}>
      <div className={styles.topWrapper}>
        <img src={avatar || avatarDefault}></img>
        <div className={styles.titleWrapper}>
          <a className={styles.title}>{loginState.profile.name}</a>
          <p className={styles.text}>Group</p>
        </div>
      </div>
      <div className={styles.tableWrapper}>
        {Object.keys(routes).map((key) => {
          const item = (
            <Link
              key={key}
              to={`/dashboard?tab=${routes[key].to}`}
              className={clsx(styles.tab, { [styles.active]: active == key })}
            >
              <i className={routes[key].icon}></i>
              <a>{t(routes[key].name)}</a>
            </Link>
          )
          if (routes[key].category) {
            if (routes[key].category == parseInt(loginState.profile.category)) {
              return item
            } else {
              return <></>
            }
          }
          return item
        })}
      </div>
    </div>
  )
}

export default Index
