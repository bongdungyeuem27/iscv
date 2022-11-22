import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { Link, useSearchParams } from 'react-router-dom'
import styles from '../styles.module.scss'
import { useTranslation } from 'react-i18next'
import _ from 'lodash'
import { getContract as contractEmployee } from '@contract/employeeController'

export default function Index({
  businessId,
  employeeId,
  requestDate,
  requestId,
  requestType,
  statusRequest,
  index,
}) {
  const [searchParams, setSearchParams] = useSearchParams()
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.index' })
  const [profile, setProfile] = useState()
  useEffect(() => {
    contractEmployee()
      .then((contractEmployee) => {
        contractEmployee.methods
          .getProfile(parseInt(employeeId))
          .call()
          .then((success) => {
            setProfile({ ...success })
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])
  return (
    <>
      <tr className={styles.body}>
        <th className={styles.column1}>{index}</th>
        <th className={styles.column2}>{profile?.name}</th>
        <th className={styles.column3}>{profile?.idCardNumber}</th>
        <th className={styles.column4}>
          {requestType == parseInt(1) && <div className={styles.TypeLR}>L & R</div>}
          {requestType == parseInt(2) && <div className={styles.TypeSW}>S & W</div>}
        </th>
        <th className={styles.column5}>
          {new Date(parseInt(requestDate * 1000)).toLocaleString()}
        </th>
        <th className={clsx(styles.column6, styles.statusWrapper)}>
          <div>
            {statusRequest == parseInt(1) && (
              <button className={clsx(styles.buttonStatus, styles.buttonWaiting)}>
                {t('waiting')}
              </button>
            )}
            {statusRequest == parseInt(2) && (
              <button className={clsx(styles.buttonStatus, styles.buttonAccepted)}>
                {t('accepted')}
              </button>
            )}
            {statusRequest == parseInt(3) && (
              <button className={clsx(styles.buttonStatus, styles.buttonDeclined)}>
                {t('decline')}
              </button>
            )}
            <button className={styles.buttonSW}>
              <Link
                to={`?tab=certificates&employeeid=${employeeId}`}
                className={clsx('fa-regular fa-pen-to-square', styles.iconS)}
              ></Link>
            </button>
          </div>
        </th>
      </tr>
    </>
  )
}
