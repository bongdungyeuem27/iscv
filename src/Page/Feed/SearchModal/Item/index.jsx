import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss'
import avatarDefault from '@asset/avatar.png'
import { Link } from 'react-router-dom'
import { getAvatar as getAvatarEmployee } from '@api/employee/profile'
import { getAvatar as getAvatarBusiness } from '@api/business/profile'

export default function Index({ name, id, typeFor }) {
  let to
  if (typeFor == 'employee') to = `/profile/${id}`
  if (typeFor == 'business') to = `/page/${id}`
  const [avatar, setAvatar] = useState()
  useEffect(() => {
    if (typeFor == 'employee') {
      getAvatarEmployee(id)
        .then((success) => setAvatar(success))
        .catch((error) => console.error(error))
    }
    if (typeFor == 'business') {
      getAvatarBusiness(id)
        .then((success) => setAvatar(success))
        .catch((error) => console.error(error))
    }
  }, [])
  return (
    <div className={styles.item}>
      <Link to={to} className={styles.avatar}>
        <img src={avatar || avatarDefault}></img>
      </Link>
      <div className={styles.text}>
        <Link to={to}>
          <div className={styles.name}>{name}</div>
        </Link>
        <div className={styles.decription}>{}</div>
      </div>
    </div>
  )
}
