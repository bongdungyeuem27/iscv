import React from 'react'
import styles from './styles.module.scss'
import { splitCamel } from '@helper/splitCamel'
import { useTranslation } from 'react-i18next'

function Index(props) {
  const { label, value } = props
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })
  return (
    <div className={styles.itemWrapper}>
      <span className={styles.item}>
        <div className={styles.iconWrapper}>
          {label == 'name' && <i className="fa-solid fa-user"></i>}
          {label == 'phone' && <i className="fa-solid fa-phone"></i>}
          {label == 'professional' && <i className="fa-solid fa-credit-card-front"></i>}
          {label == 'email' && <i className="fa-solid fa-at"></i>}
          {label == 'github' && <i className="fa-brands fa-github"></i>}
          {label == 'linkedin' && <i className="fa-brands fa-linkedin"></i>}
        </div>
        <label>{t(label)}</label>
        <a>{value}</a>
      </span>
      {/* <span className={styles.tool}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </span> */}
    </div>
  )
}

export default Index
