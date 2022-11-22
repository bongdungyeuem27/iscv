import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import cover from '@asset/cover.png'
import avatar from '@asset/avatar.png'
import clsx from 'clsx'
import { Outlet, Link, useLocation, useParams } from 'react-router-dom'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract } from '@contract/businessController'
import { getAvatar } from '@api/business/profile'
import { useTranslation } from 'react-i18next'

function Index() {
  const { loginState } = useContext(Web3Context)
  const location = useLocation()
  const [info, setInfo] = useState()
  const [hasAvatar, setHasAvatar] = useState()
  const id = parseInt(useParams().id)
  const { t } = useTranslation('layout', { keyPrefix: 'personal.index' })
  useEffect(() => {
    getContract()
      .then((success) => {
        success.methods
          .getProfile(id)
          .call()
          .then((success) => {
            setInfo({ ...success })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))

    getAvatar(id)
      .then((success) => {
        setHasAvatar(success)
      })
      .catch((error) => {
        setHasAvatar(undefined)
        console.log(error)
      })
  }, [])
  return (
    <>
      <section className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.cover}>
            <img src={cover} className={styles.image}></img>
          </div>
          <div className={styles.avatarWrapper}>
            <img src={hasAvatar || avatar}></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{info?.name}</div>
              {loginState.for == 'employee' && (
                <Link to={`/messages/page/${id}`} className={styles.messages}>
                  {t('messages')}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <Link
            to={`/page/${id}`}
            className={clsx(styles.tab, { [styles.active]: location.pathname == `/page/${id}` })}
          >
            {t('posts')}
          </Link>
          <Link
            to={`/page/${id}/about`}
            className={clsx(styles.tab, {
              [styles.active]: location.pathname == `/page/${id}/about`,
            })}
          >
            {t('about')}
          </Link>
        </div>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default Index
