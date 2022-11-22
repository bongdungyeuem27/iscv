import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { Web3Context } from '@context/Web3ContextProvider'
import { useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getContract as getContractIGG } from '@contract/iigController'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'

function Index() {
  const { loginState } = useContext(Web3Context)
  const { t } = useTranslation('page', { keyPrefix: 'posts.left.iig' })
  const params = useParams()
  const id = params.id
  const toast = useToast()
  const loading = useLoading()

  const handleLR = async () => {
    loading.open()
    await getContractIGG()
      .then(async (contractIIG) => {
        await contractIIG.methods
          ._checkExistRequestLR(loginState.id, id)
          .call({ from: loginState.address })
          .then(async (success) => {
            if (success) {
              toast.warning(t('has_request_lr'), { pauseOnHover: true, closeOnClick: true })
              return
            }
            await contractIIG.methods
              .addLRRequest(loginState.id, id)
              .send({ from: loginState.address })
              .then((success) => {
                toast.success('success', { pauseOnHover: true, closeOnClick: true })
              })
              .catch((error) => console.error(error))
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
    loading.close()
  }
  const handleSW = async () => {
    loading.open()
    await getContractIGG()
      .then(async (contractIIG) => {
        await contractIIG.methods
          ._checkExistRequestSW(loginState.id, id)
          .call({ from: loginState.address })
          .then(async (success) => {
            if (success) {
              toast.warning(t('has_request_sw'), { pauseOnHover: true, closeOnClick: true })
              return
            }
            await contractIIG.methods
              .addSWRequest(loginState.id, id)
              .send({ from: loginState.address })
              .then((success) => {
                toast.success('success', { pauseOnHover: true, closeOnClick: true })
              })
              .catch((error) => console.error(error))
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
    loading.close()
  }
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <a>{t('request_certificate')}</a>
      </div>
      <div className={styles.content}>
        <div onClick={handleLR} className={styles.item}>
          <label>{t('certificate')} Listening & Reading</label>
          <i className="fa-solid fa-play"></i>
        </div>
        <div onClick={handleSW} className={styles.item}>
          <label>{t('certificate')} Speaking & Writing</label>
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
    </div>
  )
}

export default Index
