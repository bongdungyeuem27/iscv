import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

function Index() {
  const { t } = useTranslation('page', { keyPrefix: 'setting.index' })
  return (
    <div className={styles.container}>
      <div className={styles.title}>{t('setting')}</div>
      <div className={styles.tabContainer}>
        <div className={styles.tableWrapper}>
          <div className={styles.tabWrapper}>
            <div className={clsx(styles.tab)}>
              <div className={styles.active}></div>
              <p>{t('personal_information')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
