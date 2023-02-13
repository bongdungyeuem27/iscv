import { useLoading } from '@components/Loading'
import { useToast } from '@iscv/Toast'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'

function Index() {
  const { t } = useTranslation('page', { keyPrefix: 'posts.left.iig' })
  const params = useParams()
  const id = params.id
  const toast = useToast()
  const loading = useLoading()

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <a>{t('request_certificate')}</a>
      </div>
      <div className={styles.content}>
        <div className={styles.item}>
          <label>{t('certificate')} Listening & Reading</label>
          <i className="fa-solid fa-play"></i>
        </div>
        <div className={styles.item}>
          <label>{t('certificate')} Speaking & Writing</label>
          <i className="fa-solid fa-play"></i>
        </div>
      </div>
    </div>
  )
}

export default Index
