import React, { useContext } from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import { Link, useSearchParams } from 'react-router-dom'
import { routes } from '../config'
import { useTranslation } from 'react-i18next'
function Right() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  // if (!tab) return null
  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        {(() => {
          let active = tab ?? 'default'
          return Object.keys(routes).map((key) => {
            return (
              <Link
                to={`${Object(routes)[key].to}`}
                className={clsx(styles.button, { [styles.active]: key == active })}
              >
                {t(Object(routes)[key].name + '_cv')}
              </Link>
            )
          })
        })()}
      </div>
    </div>
  )
}

export default Right
