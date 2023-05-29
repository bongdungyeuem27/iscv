import React from 'react'
import styles from './styles.module.scss'
import clsx from 'clsx'
import InfoItem from '../Components/InfoItem'

function Index() {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <InfoItem key={0} icon="fa-regular fa-info" onClick={() => {}}>
          a
        </InfoItem>
        <InfoItem key={1} icon="fa-regular fa-bell" onClick={() => {}}>
          a
        </InfoItem>
      </div>
      <div className={styles.bottom}>
        <InfoItem icon="fa-regular fa-bell" onClick={() => {}}>
          b
        </InfoItem>
      </div>
    </div>
  )
}

export default Index
