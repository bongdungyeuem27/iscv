import React from 'react'
import styles from './styles.module.scss'
import { useTranslation } from 'react-i18next'

function Index({ image, name, list }) {
  const { t } = useTranslation('page', { keyPrefix: 'home.index' })
  // console.log(list)
  return (
    <div className={styles.container}>
      <div className={styles.categoryIconWrapper}>
        <img src={image}></img>
      </div>
      <div className={styles.title}>{t(name)}</div>
      <div className={styles.content}>
        {list.map((value, index) => {
          return (
            <p key={index}>
              <a>{t(value)}</a>
            </p>
          )
        })}
      </div>
      <div className={styles.result}>
        <a>1001 Members</a>
      </div>
    </div>
  )
}

export default Index
