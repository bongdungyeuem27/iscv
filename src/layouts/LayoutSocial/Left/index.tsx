import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, useLocation } from 'react-router-dom'
import styles from './styles.module.scss'

function Index() {
  const location = useLocation()
  const { t } = useTranslation('layout', { keyPrefix: 'page.social.feed.index' })
  return (
    <div className={styles.container}>
      <NavLink
        to="/social"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/social' })}
      >
        <i className="fa-light fa-box-open-full"></i>
        <span>{t('suggestion')}</span>
      </NavLink>
      {/* <Link
        to="/friend"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/friend' })}
      >
        <i className="fa-light fa-user-group"></i>
        <a>{t('friend')}</a>
      </Link>
      <Link
        to="/follow"
        className={clsx(styles.item, { [styles.active]: location.pathname == '/follow' })}
      >
        <i className="fa-light fa-check"></i>
        <a>{t('follow')}</a>
      </Link> */}
    </div>
  )
}

export default Index
