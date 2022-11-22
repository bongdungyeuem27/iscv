import React from 'react'
import { Link } from 'react-router-dom'

export default function Tab({to, icon }) {
  return (
    <Link to={to} className={clsx(styles.tab, { [styles.active]: active == 'dashboard' })}>
      <i className={icon}></i>
      <a>{t('dashboard')}</a>
    </Link>
  )
}
