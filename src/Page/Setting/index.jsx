import React from 'react'
import styles from './styles.module.scss'
import Left from './Left'
import { useSearchParams } from 'react-router-dom'
import Personal from './Personal'
import { useTranslation } from 'react-i18next'

function Index() {
  const [searchParams] = useSearchParams()
  const { t } = useTranslation('page', { keyPrefix: 'setting.index' })
  return (
    <section className={styles.container}>
      <Left></Left>
      <div className={styles.right}>
        {searchParams.get('tab') == 'account' && <Personal></Personal>}
      </div>
    </section>
  )
}

export default Index
