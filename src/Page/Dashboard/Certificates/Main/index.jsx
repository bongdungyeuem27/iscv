import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import _ from 'lodash'
import Item from './Item'
import { useTranslation } from 'react-i18next'
import Navigation from '../../Components/Navigation'
import { getContract as getContractIIG } from '@contract/iigController'
import { Web3Context } from '@context/Web3ContextProvider'

export default function Index() {
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.index' })
  const [list, setList] = useState()
  const { loginState } = useContext(Web3Context)
  useEffect(() => {
    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListWaitingRequestForBusiness(loginState.id)
          .call({ from: loginState.address })
          .then((success) => {
            let temp = []
            _.forEach(success, (value, index) => {
              temp.push({ ...value })
            })
            setList(temp)
          })
          .catch((error) => console.error(error))
      })
      .catch((e) => console.error(error))
  }, [])

  return (
    <>
      <div className={styles.container}>
        <Navigation title={t('certificate_verification')}></Navigation>
        <div className={styles.filterWrapper}>
          <p>{t('filter')}: </p>
          <div className={styles.inputWrapper}>
            <input type="date" id="date" name="date" className={styles.filterDate} />
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="location"
              name="location"
              placeholder={t('exam_location_input')}
              className={styles.filterLocation}
            ></input>
            <div className={styles.filterDropdown}>
              {/* <BsChevronDown size="20px"></BsChevronDown> */}
            </div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="status"
              name="status"
              placeholder={t('status_input')}
              className={styles.filterStatus}
            />
            <div className={styles.filterDropdown}>
              {/* <BsChevronDown size="20px"></BsChevronDown> */}
            </div>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr className={styles.body}>
                <th className={`${styles.theaderStyle} ${styles.column1}`}>{t('number')}</th>
                <th className={`${styles.theaderStyle} ${styles.column2}`}>{t('name')}</th>
                <th className={`${styles.theaderStyle} ${styles.column3}`}>{t('id')}</th>
                <th className={`${styles.theaderStyle} ${styles.column4}`}>
                  {t('certificate_type')}
                </th>
                <th className={`${styles.theaderStyle} ${styles.column5}`}>{t('request_date')}</th>
                <th className={`${styles.theaderStyle} ${styles.column6}`}>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {list?.map((value, index) => {
                return <Item key={index} {...value} index={index}></Item>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
