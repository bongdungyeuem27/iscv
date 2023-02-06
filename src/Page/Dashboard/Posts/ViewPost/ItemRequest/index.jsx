import React, { useEffect, useState, useContext } from 'react'
import styles from './styles.module.scss'
import icon from '@asset/avatar_men.png'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { getContract as getContractBusiness } from '@contract/businessController'
import { Modal } from '@iscv/modal'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'
import { Web3Context } from '@context/Web3ContextProvider'
import { useTranslation } from 'react-i18next'
import { getAvatar } from '@api/employee/profile'
import avatarDefault from '@asset/avatar.png'
import { ContentLoader } from '@component/ContentLoader'
function Index({ employeeId, businessId, postId, applyId, job, disabled }) {
  const { loginState } = useContext(Web3Context)
  const [profile, setProfile] = useState()
  const [apply, setApply] = useState()
  const [openModal, setOpenModal] = useState(false)
  const [time, setTime] = useState()
  const toast = useToast()
  const [avatar, setAvatar] = useState(avatarDefault)
  const [isLoading, setIsLoading] = useState(false)
  const loading = useLoading()
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.posts' })
  const handleAddAppointment = async () => {
    loading.open()
    await getContractBusiness()
      .then(async (contract) => {
        await contract.methods
          .addAppointment(postId, profile.id, businessId, applyId, new Date(time).getTime())
          .send({ from: loginState.address })
          .then(async (success) => {
            toast.success('success', { pauseOnHover: true, closeOnClick: true })
            setOpenModal(false)
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => console.error(error))

    loading.close()
  }
  const loadAvatar = async () => {
    await getAvatar(employeeId)
      .then((success) => {
        setAvatar(success)
      })
      .catch((error) => console.error(error))
  }
  const loadApply = async () => {
    await getContractBusiness()
      .then(async (contract) => {
        await contract.methods
          .getApply(applyId)
          .call()
          .then((success) => {
            setApply({ ...success })
          })
          .catch((error) => console.error(error))
      })
      .then((error) => console.error(error))
  }
  const loadEmployee = async () => {
    await getContractEmployee()
      .then(async (contract) => {
        await contract.methods
          .getProfile(employeeId)
          .call()
          .then((profile) => {
            setProfile({ ...profile })
          })
      })
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await Promise.all([loadAvatar(), loadApply(), loadEmployee()]).catch((error) =>
        console.error(error)
      )
      setIsLoading(false)
    })()
  }, [])
  return (
    <>
      <Modal
        state={[openModal, setOpenModal]}
        title={t('add_appointment')}
        action={handleAddAppointment}
      >
        <div className={styles.modalAddAppointment}>
          <p>
            {t('confirm_appointment_with')} {profile?.name}
          </p>
          <div>{t('time')}</div>
          <input
            type="datetime-local"
            name="appointment_time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          ></input>
        </div>
      </Modal>
      <div className={styles.item}>
        <div className={styles.iconTextWrapper}>
          {isLoading && <ContentLoader></ContentLoader>}
          <img src={avatar}></img>
          <div className={styles.textWrapper}>
            <div className={styles.title}>
              <a>{profile?.name}</a>
              <div className={styles.follow}>{t('follow')}</div>
            </div>
            <div className={styles.content}>
              {t('applied_into_post')} {job}
            </div>
            <div className={styles.time}>
              {apply && new Date(apply.time * 1000).toLocaleString()}
            </div>
          </div>
        </div>
        {!disabled && (
          <div className={styles.moreInfo}>
            <i onClick={() => setOpenModal(true)} className="fa-solid fa-paper-plane-top"></i>
          </div>
        )}
      </div>
    </>
  )
}

export default Index
