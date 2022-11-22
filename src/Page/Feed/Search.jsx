import React, { useContext } from 'react'
import styles from './styles.module.scss'
import { SocialContext } from '@context/SocialContext'
import { useTranslation } from 'react-i18next'
function Search({ onClick }) {
  const { t } = useTranslation('page', { keyPrefix: 'feed.index' })
  return (
    <div onClick={onClick} className={styles.search}>
      <a>{t('search')}...</a>
      <i className="fa-light fa-magnifying-glass"></i>
    </div>
  )
}

export default Search
