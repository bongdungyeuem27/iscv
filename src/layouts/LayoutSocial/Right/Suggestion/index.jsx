import React from 'react'
import styles from './styles.module.scss'
import Item from './Item'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation('layout', { keyPrefix: 'social.index' })
  return (
    <div className={styles.container}>
      <div className={styles.boxTitle}>
        <a>{t('suggestion')}</a>
        <div className={styles.moreWrapper}></div>
      </div>
      {[...Array(4)].map((index) => {
        return <Item key={index}></Item>
      })}
    </div>
  )
}

export default Index
