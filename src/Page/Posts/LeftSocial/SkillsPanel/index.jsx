import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import Item from './Item'
import { Web3Context } from '@context/Web3ContextProvider'
import { useLocation } from 'react-router-dom'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Index() {
  const [list, setList] = useState()
  const { loginState } = useContext(Web3Context)
  const location = useLocation()
  const id = useParams().id
  const { t } = useTranslation('page', { keyPrefix: 'posts.left.skills' })
  useEffect(() => {
    if (location.pathname.includes('profile')) {
      getContractEmployee()
        .then((success) => {
          success.methods
            .getListSkillOfEmployee(id)
            .call()
            .then((success) => {
              setList(success)
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => console.error(error))
    }
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <a>{t('skills')}</a>
      </div>
      {list?.map((value, index) => {
        return <Item key={index} title={value.title} level={value.level}></Item>
      })}
    </div>
  )
}

export default Index
