import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import avatarDefault from '@asset/avatar.png'
import clsx from 'clsx'
import { getContract as getContractBusiness } from '@contract/businessController'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { Link } from 'react-router-dom'
import { getAvatar as getAvatarEmployee } from '@api/employee/profile'
import { getAvatar as getAvatarBusiness } from '@api/business/profile'
import { useParams } from 'react-router-dom'

function Index({ name, _id, businessId, employeeId, typeFor }) {
  const [avatar, setAvatar] = useState()
  const id = useParams().id
  useEffect(() => {
    if (typeFor === 'employee') {
      getAvatarBusiness(businessId)
        .then((success) => setAvatar(success))
        .catch((error) => console.error(error))
    }
    if (typeFor === 'business') {
      getAvatarEmployee(employeeId)
        .then((success) => setAvatar(success))
        .catch((error) => console.error(error))
    }
  }, [])
  return (
    <Link
      to={
        typeFor == 'employee' ? `/messages/page/${businessId}` : `/messages/profile/${employeeId}`
      }
      className={clsx(styles.container, {
        [styles.active]: typeFor == 'employee' ? businessId == id : employeeId == id,
      })}
    >
      <div className={styles.left}>
        <div className={styles.icon}>
          <img src={avatar || avatarDefault}></img>
        </div>
        <div className={styles.text}>
          <div className={styles.name}>{name}</div>
          {/* <div className={styles.message}>Lorem ipsum dolor sit am</div> */}
        </div>
      </div>
      <div className={styles.right}>
        {/* <div className={styles.time}>10:45</div>
        <div className={styles.count}>10</div> */}
      </div>
    </Link>
  )
}

export default Index
