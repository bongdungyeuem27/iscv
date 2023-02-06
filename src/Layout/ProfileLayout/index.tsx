import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import cover from '@asset/cover.png'
import avatar from '@asset/avatar.png'
import clsx from 'clsx'
import { Outlet, Link, useLocation, useParams } from 'react-router-dom'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { getAvatar } from '@api/employee/profile'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import { GetEmployee, getEmployee, getEmployeeByUser } from '@graphql/Employee'
import { Navigate } from 'react-router-dom'
import { IPFS_GATEWAY } from '@constant/index'

function ProfileLayout() {
  const { loginState } = useContext(Web3Context)
  const location = useLocation()
  const params = useParams()
  const id = Number(params.id)
  const { t } = useTranslation('layout', { keyPrefix: 'personal.index' })
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery<GetEmployee>(
    getEmployee,
    {
      variables: { employeeId: id },
      notifyOnNetworkStatusChange: true,
    }
  )

  if (!loading && !data)
    return (
      <div>
        <Navigate to="/404" replace></Navigate>
      </div>
    )
  return (
    <>
      <section className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.cover}>
            <img src={cover} className={styles.image}></img>
          </div>
          <div className={styles.avatarWrapper}>
            <img src={`${IPFS_GATEWAY}${data?.employee.sourceImage}` ?? avatar}></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{data?.employee.name}</div>
              {/* {loginState.for == 'business' && (
                <Link to={`/messages/profile/${id}`} className={styles.messages}>
                  {t('messages')}
                </Link>
              )} */}
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <Link
            to={`/profile/${id}`}
            className={clsx(styles.tab, { [styles.active]: location.pathname == `/profile/${id}` })}
          >
            {t('posts')}
          </Link>
          <Link
            to={`/profile/${id}/mycv`}
            className={clsx(styles.tab, {
              [styles.active]: location.pathname == `/profile/${id}/mycv`,
            })}
          >
            {t('mycv')}
          </Link>
          <Link
            to={`/profile/${id}/about`}
            className={clsx(styles.tab, {
              [styles.active]: location.pathname == `/profile/${id}/about`,
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

export default ProfileLayout
