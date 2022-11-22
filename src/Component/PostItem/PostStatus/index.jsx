import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import {useTranslation} from 'react-i18next'

function Index(props) {
  const { type } = props
  const {t} = useTranslation("component", {keyPrefix: "postItem.index"})
  return (
    <div className={clsx(styles.container, [styles[type]])}>
      <a>{t(type)}</a>
    </div>
  )
}

export default Index
