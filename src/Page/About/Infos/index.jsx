import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Web3Context } from '@context/Web3ContextProvider'
import Item from './Item'
import { useLocation } from 'react-router-dom'
import { getContract as getContractBusiness } from '@contract/businessController'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
function Index() {
  const { loginState } = useContext(Web3Context)
  const [list, setList] = useState()
  const id = useParams().id
  const location = useLocation()
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })
  useEffect(() => {
    if (location.pathname.includes('profile')) {
      getContractEmployee()
        .then((contractEmployee) => {
          contractEmployee.methods
            .getProfile(id)
            .call()
            .then((success) => setList({ ...success }))
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }
    if (location.pathname.includes('page')) {
      getContractBusiness()
        .then((contractBusiness) => {
          contractBusiness.methods
            .getProfile(id)
            .call()
            .then((success) => {
              setList({ ...success })
            })
            .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))
    }
  }, [])
  return (
    <div className={styles.personalWrapper}>
      {list && (
        <div className={styles.personal}>
          <div className={styles.title}>{t('personal')}</div>
          {Object.keys(list).map((key) => {
            if (
              !Number.isInteger(parseInt(key)) &&
              key != 'category' &&
              key != 'id' &&
              key != 'idCardNumber' &&
              key != 'user' &&
              key != 'sourceImage' &&
              key != 'password'
            )
              return <Item key={key} label={key} value={list[key]}></Item>
          })}
        </div>
      )}
    </div>
  )
}

export default Index
