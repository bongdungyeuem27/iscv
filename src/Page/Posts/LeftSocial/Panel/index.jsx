import { useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

import { useTranslation } from 'react-i18next'

function Index(props) {
  const { type, children } = props

  const { t } = useTranslation('page', { keyPrefix: 'posts.left.skills' })

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <a>{t(type)}</a>
      </div>
      {children}
    </div>
  )
}

export default Index