import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

function Index({ email, phone }: { email: string; phone: string }) {
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.title}>
          <div className={styles.string}>{t('phone')}</div>
        </div>
        <div className={styles.content}>{phone}</div>
      </div>
      <div className={styles.item}>
        <div className={styles.title}>
          <div className={styles.string}>{t('email')}</div>
        </div>
        <div className={styles.content}>{email}</div>
      </div>
      {/* <div className={styles.item}>
        <div className={styles.title}>
          <div className={styles.string}>{t('home')}</div>
        </div>
        <div className={styles.content}>Ho Chi Minh City</div>
      </div> */}
    </div>
  )
}

export default Index
