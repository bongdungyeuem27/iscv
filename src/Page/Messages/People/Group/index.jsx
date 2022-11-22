import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import CompactItem from '../../Components/CompactItem'
import _ from 'lodash'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { getRecentlyPage, getRecentlyProfile } from '@api/messages/chat'
import { ChatContext } from '../../ChatContext'
import { ContentLoader } from '@component/ContentLoader'
import { useTranslation } from 'react-i18next'
function Index() {
  const { loginState } = useContext(Web3Context)
  const { list, handleSend, forceUpdate } = useContext(ChatContext)
  const [listAccount, setListAccount] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const { t } = useTranslation('page', { keyPrefix: 'messages.index' })
  useEffect(() => {
    console.log('force')
    if (loginState.for == 'employee') {
      getRecentlyPage(loginState.id)
        .then((success) => {
          let temp = success.data.map((value, index) => {
            return { ...value, typeFor: 'employee' }
          })
          setListAccount(temp)
        })
        .catch((error) => console.error(error))
    }
    if (loginState.for == 'business') {
      getRecentlyProfile(loginState.id)
        .then((success) => {
          let temp = success.data.map((value, index) => {
            return { ...value, typeFor: 'business' }
          })
          setListAccount(temp)
        })
        .catch((error) => console.error(error))
    }
    setIsLoading(false)
  }, [forceUpdate])
  return (
    <div className={styles.group}>
      <div className={styles.title}>
        <div className={styles.iconGroupName}>
          <div className={styles.icon}>
            <i className="fa-sharp fa-solid fa-location-check"></i>
          </div>
          <div className={styles.name}>{t('recently_messages')}</div>
        </div>
        <div className={styles.more}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>

      <div className={styles.main}>
        {isLoading ? (
          <ContentLoader></ContentLoader>
        ) : (
          <>
            {listAccount?.map((value, index) => {
              return <CompactItem key={index} {...value}></CompactItem>
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default Index
