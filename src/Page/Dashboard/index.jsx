import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Left from './Left'
import styles from './styles.module.scss'
import { routes } from './config'

import { useSearchParams } from 'react-router-dom'

function Index() {
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  return (
    <div className={styles.container}>
      <Left></Left>
      <div className={styles.right}>
        {routes[tab] ? routes[tab].element : routes['main'].element}
      </div>
    </div>
  )
}

export default Index
