import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import styles from './styles.module.scss'
import avatar from '@asset/avatar.png'
import { Web3Context } from '@context/Web3ContextProvider'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { phoneRegExp, emailRegExp, urlRegExp } from '@helper/regex'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { getContract as getContractBusiness } from '@contract/businessController'
import { uploadAvatar, getAvatar, deleteAvatar } from '@api/employee/profile'
import Modal from '@component/Modal'
import { useTranslation } from 'react-i18next'

function Index() {
  const { loginState } = useContext(Web3Context)
  const { t } = useTranslation('page', { keyPrefix: 'setting.personal' })
  const [list, setList] = useState()
  const loading = useLoading()
  const toast = useToast()
  const [fileAvatar, setFileAvatar] = useState()
  const fileAvatarRef = useRef()
  const [editName, setEditName] = useState(false)
  const [editPhone, setEditPhone] = useState(false)
  const [editProfessional, setEditProfessional] = useState(false)
  const [editEmail, setEditEmail] = useState(false)
  const [editGithub, setEditGithub] = useState(false)
  const [editLinkedin, setEditLinkedin] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(false)
  const [openDeleteAvatar, setOpenDeleteAvatar] = useState(false)
  const formik = useFormik({
    initialValues: {
      name: undefined,
      phone: undefined,
      professional: undefined,
      email: undefined,
      github: undefined,
      linkedin: undefined,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(t('required')),
      phone: Yup.string().required(t('required')).matches(phoneRegExp, t('invalid')),
      professional: Yup.string().required(t('required')),
      email: Yup.string().required(t('required')).matches(emailRegExp, t('invalid')),
      github: Yup.string().required(t('required')),
      linkedin: Yup.string(),
    }),
    onSubmit: async (values) => {
      loading.open()
      await getContractEmployee()
        .then(async (contractEmployee) => {
          await contractEmployee.methods
            .editEmployee(
              parseInt(list.id),
              parseInt(list.idCardNumber),
              values.name.toString(),
              values.phone.toString(),
              values.professional.toString(),
              values.email.toString(),
              values.github.toString(),
              values.linkedin.toString(),
              '/'
            )
            .send({ from: loginState.address })
            .then((success) => {
              toast.success('success', { pauseOnHover: true, closeOnClick: true })
            })
            .catch((error) => {
              toast.error('error', { pauseOnHover: true, closeOnClick: true })
              console.log(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })

      loading.close()
    },
  })

  const handleChangeAvatar = useCallback(async () => {
    if (!fileAvatar) return
    loading.open()
    let df = new FormData()
    df.append('image', fileAvatar)
    await uploadAvatar(df, loginState.id)
      .then((success) => {
        toast.success('success', { pauseOnHover: true, closeOnClick: true })
      })
      .catch((error) => console.error(error))

    loading.close()
  }, [fileAvatar])
  useEffect(() => {
    if (loginState.for != 'employee') return
    getContractEmployee()
      .then((contractEmployee) => {
        contractEmployee.methods
          .getProfile(loginState.id)
          .call({ from: loginState.address })
          .then((success) => {
            let temp = { ...success }
            formik.setFieldValue('name', temp.name)
            formik.setFieldValue('phone', temp.phone)
            formik.setFieldValue('professional', temp.professional)
            formik.setFieldValue('email', temp.email)
            formik.setFieldValue('github', temp.github)
            formik.setFieldValue('linkedin', temp.linkedin)
            setList(temp)
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.error(error))

    getAvatar(loginState.id)
      .then((success) => {
        setAvatarUrl(success)
      })
      .catch((error) => console.log(error))
  }, [])

  const handleDeleteAvatar = useCallback(() => {
    loading.open()
    deleteAvatar(loginState.id)
      .then((success) => {
        console.log(success)
        toast.success('success', { pauseOnHover: true, closeOnClick: true })
        setOpenDeleteAvatar(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error('error', { pauseOnHover: true, closeOnClick: true })
      })
    loading.close()
  }, [loginState.id])
  return (
    <>
      <Modal state={[openDeleteAvatar, setOpenDeleteAvatar]} action={handleDeleteAvatar}>
        Are you sure you want to delete this avatar?
      </Modal>
      <div className={styles.container}>
        <div className={styles.avatarWrapper}>
          <div className={styles.iconWrapper}>
            <img src={fileAvatar ? URL.createObjectURL(fileAvatar) : avatarUrl || avatar}></img>
            <div className={styles.buttonImport}>
              <i onClick={() => fileAvatarRef.current.click()} className="fa-solid fa-camera"></i>
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <input
              type="file"
              id="file"
              multiple={false}
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => setFileAvatar(e.target.files[0])}
              ref={fileAvatarRef}
              style={{ display: 'none' }}
            />
            <button onClick={() => setOpenDeleteAvatar(true)} className={styles.delete}>
              {t('delete')}
            </button>
            <button onClick={handleChangeAvatar} className={styles.upload}>
              {t('upload')}
            </button>
          </div>
        </div>
        {list && (
          <>
            <div className={styles.itemWrapper}>
              <label htmlFor="name"> {t('name')}</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editName}
                  type="text"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                ></input>
                <p>{formik.errors.name}</p>
              </div>
              <button onClick={() => setEditName((e) => !e)}>
                {editName ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
            <div className={styles.itemWrapper}>
              <label htmlFor="phone"> {t('phone')}</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editPhone}
                  type="number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                ></input>
                <p>{formik.errors.phone}</p>
              </div>
              <button onClick={() => setEditPhone((e) => !e)}>
                {editPhone ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
            <div className={styles.itemWrapper}>
              <label htmlFor="professional"> {t('professional')}</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editProfessional}
                  type="text"
                  name="professional"
                  value={formik.values.professional}
                  onChange={formik.handleChange}
                ></input>
                <p>{formik.errors.professional}</p>
              </div>
              <button onClick={() => setEditProfessional((e) => !e)}>
                {editProfessional ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
            <div className={styles.itemWrapper}>
              <label htmlFor="email">Email</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editEmail}
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                ></input>
                <p>{formik.errors.email}</p>
              </div>
              <button onClick={() => setEditEmail((e) => !e)}>
                {editEmail ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
            <div className={styles.itemWrapper}>
              <label htmlFor="github">Github</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editGithub}
                  type="text"
                  name="github"
                  onChange={formik.handleChange}
                  value={formik.values.github}
                ></input>
                <p>{formik.errors.github}</p>
              </div>
              <button onClick={() => setEditGithub((e) => !e)}>
                {editGithub ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
            <div className={styles.itemWrapper}>
              <label htmlFor="linkedin">Linked In</label>
              <div className={styles.inputGroup}>
                <input
                  disabled={!editLinkedin}
                  type="text"
                  name="linkedin"
                  value={formik.values.linkedin}
                  onChange={formik.handleChange}
                ></input>
                <p>{formik.errors.linkedin}</p>
              </div>
              <button onClick={() => setEditLinkedin((e) => !e)}>
                {editLinkedin ? (
                  <i className="fa-regular fa-xmark"></i>
                ) : (
                  <i className="fa-regular fa-pen-line"></i>
                )}
              </button>
            </div>
          </>
        )}

        <div className={styles.saveWrapper}>
          <button type="submit" onClick={formik.handleSubmit}>
            {t('save')}
          </button>
        </div>
      </div>
    </>
  )
}

export default Index
