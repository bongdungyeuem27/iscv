import React, { useContext, useRef, useEffect } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

function Index(props) {
  const { t } = useTranslation('component', { keyPrefix: 'morePanel.index' })
  return (
    <div className={clsx(styles.container)}>
      <div className={styles.top}>
        <div className={styles.title}>{t('notifications')}</div>
        <div className={styles.clear}>{t('clear_all')}</div>
      </div>
    </div>
  )
}

export default Index
