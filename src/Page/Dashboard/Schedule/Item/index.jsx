import React, { useEffect, useState, useContext } from 'react'
import styles from './styles.module.scss'
import avatarDefault from '@asset/avatar.png'
import { getAvatar } from '@api/employee/profile'
import { getContract as getContractBusiness } from '@contract/businessController'
import { ScheduleContext } from '../ScheduleContext'
import { useToast } from '@component/Toast'
function Index({ time, name, job, employeeId, businessId, address, appointmentId }) {
  const { setForceUpdate } = useContext(ScheduleContext)
  const [avatar, setAvatar] = useState(avatarDefault)
  const toast = useToast()
  useEffect(() => {
    getAvatar(parseInt(employeeId))
      .then((success) => setAvatar(success))
      .catch((error) => console.error(error))
  }, [])
  const handleDelete = () => {
    getContractBusiness()
      .then((contractBusiness) => {
        contractBusiness.methods
          .deleteAllAppointment(parseInt(businessId), parseInt(appointmentId))
          .send({ from: address })
          .then((success) => {
            toast.success('', { pauseOnHover: true, closeOnClick: true })
            setForceUpdate((e) => !e)
          })
          .catch((error) => {
            toast.error('', { pauseOnHover: true, closeOnClick: true })
            console.error(error)
          })
      })
      .catch((error) => console.error(error))
  }
  return (
    <div className={styles.item}>
      <div className={styles.time}>{new Date(parseInt(time)).toLocaleTimeString()}</div>
      <div className={styles.content}>
        <div className={styles.left}>
          <div className={styles.avatar}>
            <img src={avatar}></img>
          </div>
          <div className={styles.contentWrapper}>
            <div className={styles.contentTime}>
              {new Date(parseInt(time)).toLocaleTimeString()}
            </div>
            <div className={styles.contentPost}>{job}</div>
            <div className={styles.contentName}>{name}</div>
          </div>
        </div>
        <div className={styles.right}>
          <i onClick={handleDelete} className="fa-solid fa-trash-list"></i>
        </div>
      </div>
    </div>
  )
}

export default Index
