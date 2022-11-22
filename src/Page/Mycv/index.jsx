import React, { useEffect, useContext, useState } from 'react'
import styles from './styles.module.scss'
import { useParams, useSearchParams } from 'react-router-dom'
import Left from './Left'
import Right from './Right'
import { CUSTOMCVDIMENSION } from './CVCustom/config'
import MYCV from './CVCustom/Container'
import Default from './Default'
import { routes } from './config'
function Index() {
  const params = useParams()
  const id = params.id
  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab')
  return (
    <div className={styles.container}>
      <Left></Left>
      <div
        id="mycv"
        style={{ width: CUSTOMCVDIMENSION.WIDTH, height: CUSTOMCVDIMENSION.HEIGHT }}
        className={styles.main}
      >
        {routes[tab] ? routes[tab].element : routes['default'].element}
      </div>
      <Right></Right>
    </div>
  )
}

export default Index
