import React, { useState, useContext, memo, useRef } from 'react'
import styles from './styles.module.scss'
import background from '@asset/background_register.png'
import Language from '@component/Language'
import avatarDefault from '@asset/avatar.png'
import clsx from 'clsx'
import { Web3Context } from '@context/Web3ContextProvider'
import { useToast } from '@component/Toast'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { emailRegExp, phoneRegExp } from '@helper/regex'
import Web3 from 'web3'
import detectEthereumProvider from '@metamask/detect-provider'
import { useLoading } from '@component/Loading'
import * as businessController from '@contract/businessController'
import * as employeeController from '@contract/employeeController'
import Toggle from '@component/Toggle'
import { CATEGORY } from '@constant/businessConst'
import { uploadAvatar as uploadAvatarBusiness } from '@api/business/profile'
import { uploadAvatar as uploadAvatarEmployee } from '@api/employee/profile'
import { useTranslation } from 'react-i18next'

function Index() {
  const { loginState, dispatchLogin } = useContext(Web3Context)
  const inputImageRef = useRef()
  const toast = useToast()
  const [typeFor, setTypeFor] = useState(false)
  const loading = useLoading()
  const navigate = useNavigate()
  const { t } = useTranslation('page', { keyPrefix: 'register.index' })
  const formik = useFormik({
    initialValues: {
      avatar: undefined,
      idcard: '',
      fullname: '',
      phone: '',
      professional: 'another',
      email: '',
      github: '',
      linkedin: '',
      category: '1',
      password: '',
      confirmpassword: '',
    },
    validationSchema: Yup.object({
      avatar: Yup.mixed()
        .required(t('require'))
        .test('type', 'Only the following formats are accepted: .jpeg, .jpg, .jpg', (value) => {
          return (
            value &&
            (value.type === 'image/jpeg' ||
              value.type === 'image/jpg' ||
              value.type === 'image/png')
          )
        }),
      idcard: Yup.string(t('invalid'))
        .min(0, t('invalid'))
        .matches(/(^[0-9]{9}$)|(^[0-9]{12}$)/g, t('invalid')),

      fullname: Yup.string().required(t('require')),
      phone: Yup.string().required(t('require')).matches(phoneRegExp, t('invalid')),
      professional: Yup.string().required(t('require')),
      email: Yup.string()
        .email(t('invalid'))
        .required(t('require'))
        .matches(emailRegExp, t('invalid')),
      github: Yup.string(),
      linkedin: Yup.string(),
      category: Yup.string(),
      password: Yup.string().required(t('require')),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password')], t('invalid'))
        .required(t('require')),
    }),
    onSubmit: async (values) => {
      const provider = await detectEthereumProvider()
      const web3 = new Web3(provider)
      loading.open()
      if (typeFor) {
        {
          const contractBusiness = new web3.eth.Contract(
            businessController.ABI,
            businessController.ADDRESS
          )
          await contractBusiness.methods
            ._checkExistBusinessAccount()
            .call({ from: loginState.address })
            .then(async (success) => {
              if (success) {
                toast.warning(t('had_register'), { pauseOnHover: true, closeOnClick: true })
                return
              } else {
                await contractBusiness.methods
                  .addBusiness(
                    parseInt(values.category),
                    values.fullname.toString(),
                    values.phone.toString(),
                    values.professional.toString(),
                    values.email.toString(),
                    values.github.toString(),
                    values.linkedin.toString(),
                    '/',
                    values.password.toString()
                  )
                  .send({ from: loginState.address })
                  .then(async () => {
                    await contractBusiness.methods
                      .login(values.password)
                      .call({ from: loginState.address })
                      .then(async (success) => {
                        const id = parseInt(success)
                        if (id > 0) {
                          await contractBusiness.methods
                            .getProfile(id)
                            .call({ from: loginState.address })
                            .then(async (profile) => {
                              let df = new FormData()
                              df.append('image', values.avatar)
                              await uploadAvatarBusiness(df, id)
                                .then((success) => {
                                  toast.success('', {
                                    pauseOnHover: true,
                                    closeOnClick: true,
                                  })
                                  dispatchLogin({
                                    type: 'business_login',
                                    id: id,
                                    profile: { ...profile },
                                    remember: true,
                                  })
                                  navigate('/', { replace: true })
                                })
                                .catch((error) => {
                                  console.log(error)
                                  toast.error()
                                })
                            })
                            .catch((error) => {
                              console.log(error)
                              toast.error()
                            })
                        }
                      })
                  })
                  .catch((error) => {
                    console.log(error)
                    toast.error()
                  })
              }
            })
            .catch((error) => {
              console.log(error)
              toast.error()
            })
        }
      } else {
        const contractEmployee = new web3.eth.Contract(
          employeeController.ABI,
          employeeController.ADDRESS
        )
        await contractEmployee.methods
          ._checkExistEmployeeAccount()
          .call({ from: loginState.address })
          .then(async (success) => {
            if (success) {
              toast.warning(t('had_register'), { pauseOnHover: true, closeOnClick: true })
              return
            } else {
              await contractEmployee.methods
                .addEmployee(
                  1,
                  parseInt(values.idcard),
                  values.fullname.toString(),
                  values.phone.toString(),
                  values.professional.toString(),
                  values.email.toString(),
                  values.github.toString(),
                  values.linkedin.toString(),
                  '/',
                  values.password.toString()
                )
                .send({ from: loginState.address })
                .then(async () => {
                  await contractEmployee.methods
                    .login(values.password)
                    .call({ from: loginState.address })
                    .then(async (success) => {
                      const id = parseInt(success)
                      if (id > 0) {
                        await contractEmployee.methods
                          .getProfile(id)
                          .call({ from: loginState.address })
                          .then(async (profile) => {
                            let df = new FormData()
                            df.append('image', values.avatar)
                            await uploadAvatarEmployee(df, id)
                              .then((success) => {
                                toast.success('', {
                                  pauseOnHover: true,
                                  closeOnClick: true,
                                })
                                dispatchLogin({
                                  type: 'employee_login',
                                  id: id,
                                  profile: { ...profile },
                                  remember: true,
                                })
                                navigate('/', { replace: true })
                              })
                              .catch((error) => {
                                console.log(error)
                                toast.error()
                              })
                          })
                          .catch((error) => {
                            console.log(error)
                            toast.error()
                          })
                      }
                    })
                })
                .catch((error) => {
                  console.log(error)
                  toast.error()
                })
            }
          })
          .catch((error) => {
            console.log(error)
            toast.error()
          })
      }

      loading.close()
    },
  })
  return (
    <div className={styles.container} style={{ backgroundImage: 'url(' + background + ')' }}>
      <div className={styles.languageWrapper}>
        <div className={styles.language}>
          <Language></Language>
        </div>
      </div>
      <div className={styles.loginTitle}>{t('register_your_account')}</div>
      <div className={styles.toggleWrapper}>
        <span>{t('employee')}</span>
        <Toggle positiveColor="blue" negativeColor="purple" state={[typeFor, setTypeFor]}></Toggle>
        <span>{t('business')}</span>
      </div>
      <div className={clsx(styles.boxWrapper, styles.avatarBox)}>
        <img
          src={formik.values.avatar ? URL.createObjectURL(formik.values.avatar) : avatarDefault}
        ></img>
        <input
          type="file"
          name="avatar"
          ref={inputImageRef}
          className={styles.input}
          accept="image/png, image/jpg, image/jpeg"
          style={{ display: 'none' }}
          onChange={(e) => formik.setFieldValue('avatar', e.target.files[0])}
        ></input>
        <div className={styles.iconAvatar}>
          <i onClick={() => inputImageRef.current.click()} className="fa-solid fa-camera"></i>
        </div>
      </div>

      <p className={styles.error}>{formik.errors.avatar}</p>
      <div className={styles.main}>
        <div className={clsx(styles.boxWrapper, styles.address)}>
          <label className={styles.label}>{t('address')}</label>
          <p className={styles.input}>{loginState.address}</p>
        </div>
        <div className={styles.mainInput}>
          <div className={styles.left}>
            {!typeFor && (
              <div className={styles.boxWrapper}>
                <label className={styles.label}>{t('id')}</label>
                <input
                  type="text"
                  name="idcard"
                  className={styles.input}
                  value={formik.values.idcard}
                  onChange={formik.handleChange}
                ></input>
                <p className={styles.error}>{formik.errors.idcard}</p>
              </div>
            )}

            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('name')}</label>
              <input
                type="text"
                name="fullname"
                className={styles.input}
                value={formik.values.fullname}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.fullname}</p>
            </div>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('phone')}</label>
              <input
                type="phone"
                name="phone"
                className={styles.input}
                value={formik.values.phone}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.phone}</p>
            </div>
            {!typeFor && (
              <div className={styles.boxWrapper}>
                <label className={styles.label}>{t('professional')}</label>
                <select
                  // type="text"
                  name="professional"
                  className={clsx(styles.input, styles.select)}
                  value={formik.values.professional}
                  onChange={formik.handleChange}
                >
                  <option value="student">Student</option>
                  <option value="fresher">Fresher</option>
                  <option value="intern">Intern</option>
                  <option value="another">Another</option>
                </select>
                <p className={styles.error}>
                  {formik.errors.professional &&
                    formik.touched.professional &&
                    formik.errors.professional}
                </p>
              </div>
            )}
            {typeFor && (
              <div className={styles.boxWrapper}>
                <label className={styles.label}>{t('category')}</label>
                <select
                  // type="text"
                  name="category"
                  className={clsx(styles.input, styles.select)}
                  value={formik.values.category}
                  onChange={formik.handleChange}
                >
                  {Object.keys(CATEGORY).map((key, index) => {
                    return (
                      <option key={key} value={CATEGORY[key].type}>
                        {CATEGORY[key].name}
                      </option>
                    )
                  })}
                </select>
                <p className={styles.error}>{formik.errors.professional}</p>
              </div>
            )}
            {typeFor && (
              <div className={styles.boxWrapper}>
                <label className={styles.label}>{t('professional')}</label>
                <select
                  // type="text"
                  name="professional"
                  className={clsx(styles.input, styles.select)}
                  value={formik.values.professional}
                  onChange={formik.handleChange}
                >
                  <option value="education">Education</option>
                  <option value="it">IT</option>
                  <option value="commerce">Commerce</option>
                  <option value="another">Another</option>
                </select>
                <p className={styles.error}>{formik.errors.professional}</p>
              </div>
            )}
          </div>
          <div className={styles.right}>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('email')}</label>
              <input
                type="email"
                name="email"
                className={styles.input}
                value={formik.values.email}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.email}</p>
            </div>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('github')}</label>
              <input
                type="text"
                name="github"
                className={styles.input}
                value={formik.values.github}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.github}</p>
            </div>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('linkedin')}</label>
              <input
                type="text"
                name="linkedin"
                className={styles.input}
                value={formik.values.linkedin}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.linkedin}</p>
            </div>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('password')}</label>
              <input
                type="password"
                name="password"
                className={styles.input}
                value={formik.values.password}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.password}</p>
            </div>
            <div className={styles.boxWrapper}>
              <label className={styles.label}>{t('confirm_password')}</label>
              <input
                type="password"
                name="confirmpassword"
                className={styles.input}
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.confirmpassword}</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.boxWrapper}>
        <button type="submit" onClick={formik.handleSubmit} className={styles.button}>
          {t('register')}
        </button>
      </div>
    </div>
  )
}

export default memo(Index)
