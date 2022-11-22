import React, { useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Link, useSearchParams } from 'react-router-dom'
import { routes } from '../config'
import { useTranslation } from 'react-i18next'
function Index() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {(() => {
          let active = routes[tab] ? tab : 'default'
          return Object.keys(routes).map((key) => {
            return (
              <Link
                to={`?tab=${routes[key].to}`}
                className={clsx(styles.button, { [styles.active]: key == active })}
              >
                {t(routes[key].name)}
              </Link>
            )
          })
        })()}
      </div>
    </div>
  )
}

export default Index
