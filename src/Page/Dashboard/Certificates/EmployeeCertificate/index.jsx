import React, { useState, useEffect, useLayoutEffect, useContext, useCallback } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Web3Context } from '@context/Web3ContextProvider'
import ModalAddLR from './ModalAddLR'
import ModalAddSW from './ModalAddSW'
import _ from 'lodash'
import ItemLR from './ItemLR'
import ItemSW from './ItemSW'
import { Modal } from '@iscv/modal'
import { useToast } from '@component/Toast'
import Navigation from '../../Components/Navigation'
import { getContract as getContractIIG } from '@contract/iigController'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useSearchParams } from 'react-router-dom'
import { _fetchData } from 'ethers/lib/utils'

export default function Index() {
  const { loginState } = useContext(Web3Context)
  const [openModalLR, setOpenModalLR] = useState(false)
  const [openModalSW, setOpenModalSW] = useState(false)

  const [requestLR, setRequestLR] = useState()
  const [requestSW, setRequestSW] = useState()

  const [listLR, setListLR] = useState()
  const [listSW, setListSW] = useState()

  const toast = useToast()
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.employeeCertificate' })
  const [searchParams] = useSearchParams()
  const employeeId = searchParams.get('employeeid')
  const [profile, setProfile] = useState()
  const getRequest = () => {
    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListWaitingRequestForMyBusinessByEmployeeId(loginState.id, employeeId)
          .call({ from: loginState.address })
          .then((success) => {
            _.forEach(success, (value, index) => {
              if (value.requestType == '1' && !requestLR) {
                setRequestLR({ ...value })
              }
              if (value.requestType == '2' && !requestSW) {
                setRequestSW({ ...value })
              }
            })
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }
  const getLRResult = () => {
    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListLRResultOfEmployee(employeeId)
          .call({ from: loginState.address })
          .then((success) => {
            let temp = success.map((value, index) => {
              return { ...value }
            })
            setListLR(temp)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }
  const getSWResult = () => {
    getContractIIG()
      .then((contractIIG) => {
        contractIIG.methods
          .getListSWResultOfEmployee(employeeId)
          .call({ from: loginState.address })
          .then((success) => {
            let temp = success.map((value, index) => {
              return { ...value }
            })
            setListSW(temp)
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }
  const getProfile = useCallback(() => {
    getContractEmployee()
      .then((contractEmployee) => {
        contractEmployee.methods
          .getProfile(employeeId)
          .call()
          .then((success) => {
            setProfile({ ...success })
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])
  useEffect(() => {
    getRequest()
    getLRResult()
    getSWResult()
    getProfile()
  }, [])
  return (
    <>
      {/* AddLR */}
      {profile && (
        <ModalAddLR
          state={[openModalLR, setOpenModalLR]}
          request={requestLR}
          profile={profile}
        ></ModalAddLR>
      )}
      {profile && (
        <ModalAddSW
          state={[openModalSW, setOpenModalSW]}
          request={requestSW}
          profile={profile}
        ></ModalAddSW>
      )}

      <div className={styles.container}>
        <Navigation to={-1} title={t('certificate_of_employee')}></Navigation>
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
            <div className={styles.filterDropdown}></div>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              id="status"
              name="status"
              placeholder={t('status_input')}
              className={styles.filterStatus}
            />
            <div className={styles.filterDropdown}></div>
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitleWrapper}>
            <div className={styles.textTitle}>
              <a className={styles.iconWrapper}>
                <i className={clsx('fa-solid fa-ear-muffs', styles.icon)}></i>
                <i className={clsx('fa-solid fa-book-open', styles.icon)}></i>
              </a>
              {t('list_lr')}
            </div>

            {requestLR && (
              <button
                className={styles.buttonAdd}
                onClick={() => {
                  setOpenModalLR(true)
                }}
              >
                {t('add')}
              </button>
            )}
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.body}>
                  <th className={`${styles.theaderStyle} ${styles.column1}`}>{t('number')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column2}`}>{t('test_date')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column3}`}>{t('test_shift')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column4}`}>{t('expire_date')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>
                    {t('listening_score')}
                  </th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>
                    {t('reading_score')}
                  </th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>{t('total_score')}</th>
                </tr>
              </thead>
              <tbody>
                {listLR?.map((value, index) => {
                  return <ItemLR key={index} {...value} index={index}></ItemLR>
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className={styles.group}>
          <div className={styles.groupTitleWrapper}>
            <div className={styles.textTitle}>
              <a className={styles.iconWrapper}>
                <i className={clsx('fa-solid fa-face-laugh', styles.icon)}></i>
                <i className={clsx('fa-solid fa-feather', styles.icon)}></i>
              </a>
              {t('list_sw')}
            </div>
            {requestSW && (
              <button
                className={styles.buttonAdd}
                onClick={() => {
                  setOpenModalSW(true)
                }}
              >
                {t('add')}
              </button>
            )}
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead className={styles.thead}>
                <tr className={styles.body}>
                  <th className={`${styles.theaderStyle} ${styles.column1}`}>{t('number')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column2}`}>{t('test_date')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column3}`}>{t('test_shift')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column4}`}>{t('expire_date')}</th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>
                    {t('speaking_score')}
                  </th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>
                    {t('writing_score')}
                  </th>
                  <th className={`${styles.theaderStyle} ${styles.column5}`}>{t('total_score')}</th>
                </tr>
              </thead>
              <tbody>
                {listSW?.map((value, index) => {
                  return <ItemSW key={index} {...value} index={index}></ItemSW>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
