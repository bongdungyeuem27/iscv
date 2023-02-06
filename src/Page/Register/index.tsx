import { useLazyQuery, useQuery } from '@apollo/client'
import avatarDefault from '@asset/avatar.png'
import background from '@asset/background_register.png'
import Language from '@component/Language'
import { useToast } from '@component/Toast'
import { Toggle } from '@component/Toggle'
import { CATEGORY } from '@constant/businessConst'
import { getEmployeeByUser } from '@graphql/Employee'
import { emailRegExp, phoneRegExp } from '@helper/regex'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import { useFormik } from 'formik'
import { memo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import styles from './styles.module.scss'
import { Professional } from './types'
import { useRegister } from './useRegister'

function Index() {
  const signer = useSelector((state: RootState) => state.auth.signer)
  const avatarRef = useRef<HTMLInputElement>(null)
  const [employeeOrBusiness, setEmployeeOrBusiness] = useState(false)
  const toast = useToast()
  const account = useSelector((state: RootState) => state.auth.account)
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery(getEmployeeByUser, {
    variables: { user: account },
    notifyOnNetworkStatusChange: true,
  })
  const registerInfo = useLazyQuery(getEmployeeByUser, {
    variables: { user: account },
    notifyOnNetworkStatusChange: true,
    onCompleted(x) {
      if (x.employeeByUser != null) toast.info(t('had_register'))
    },
  })

  const navigate = useNavigate()
  const { t } = useTranslation('page', { keyPrefix: 'register.index' })
  const formik = useFormik({
    initialValues: {
      avatar: undefined,
      fullname: '',
      phone: '',
      professional: Professional.ANOTHER,
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
      await registerInfo[0]()
      useRegister(values, signer!, toast, navigate, refetch)
    },
  })
  return (
    <div className={styles.container}>
      <div className={styles.languageWrapper}>
        <div className={styles.language}>{/* <Language></Language> */}</div>
      </div>
      <div className={styles.loginTitle}>{t('register_your_account')}</div>
      <div className={styles.toggleWrapper}>
        <span>{t('employee')}</span>
        <Toggle checked={employeeOrBusiness!} setChecked={setEmployeeOrBusiness!}></Toggle>
        <span>{t('business')}</span>
      </div>
      <img
        width={150}
        height={150}
        src={formik?.values.avatar ? URL.createObjectURL(formik.values.avatar) : avatarDefault}
        className={styles.avatarImg}
        alt="avatar"
      ></img>
      <div className={clsx(styles.boxWrapper, styles.avatarBox)}>
        <input
          type="file"
          name="avatar"
          ref={avatarRef}
          className={styles.input}
          accept="image/png, image/jpg, image/jpeg"
          style={{ display: 'none' }}
          onChange={(e) => formik?.setFieldValue('avatar', e?.target?.files?.item(0))}
        ></input>
        <div className={styles.iconAvatar}>
          <i onClick={() => avatarRef?.current?.click()} className="fa-solid fa-camera"></i>
        </div>
      </div>

      <p className={styles.error}>{formik?.errors.avatar?.toString()}</p>
      <form className={styles.main} onSubmit={formik?.handleSubmit}>
        <div className={clsx(styles.boxWrapper, styles.address)}>
          <label className={styles.label}>{t('address')}</label>
          <p className={styles.input}>{signer?._address}</p>
        </div>
        <div className={styles.mainInput}>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('name')}</label>
            <input
              type="text"
              name="fullname"
              className={styles.input}
              value={formik?.values.fullname}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.fullname?.toString()}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('phone')}</label>
            <input
              type="phone"
              name="phone"
              className={styles.input}
              value={formik?.values.phone}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.phone?.toString()}</p>
          </div>

          <div className={styles.boxWrapper}>
            <label className={styles.label}>{'professional'}</label>
            <select
              // type="text"
              name="professional"
              className={styles.input}
              value={formik?.values.professional}
              onChange={formik?.handleChange}
            >
              <option value="student">Student</option>
              <option value="fresher">Fresher</option>
              <option value="intern">Intern</option>
              <option value="another">Another</option>
            </select>
            <p className={styles.error}>{formik?.errors.professional?.toString()}</p>
          </div>

          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('email')}</label>
            <input
              type="email"
              name="email"
              className={styles.input}
              value={formik?.values.email}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.email?.toString()}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('github')}</label>
            <input
              type="text"
              name="github"
              className={styles.input}
              value={formik?.values.github}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.github?.toString()}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('linkedin')}</label>
            <input
              type="text"
              name="linkedin"
              className={styles.input}
              value={formik?.values.linkedin}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.linkedin}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('password')}</label>
            <input
              type="password"
              name="password"
              className={styles.input}
              value={formik?.values.password}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.password}</p>
          </div>
          <div className={styles.boxWrapper}>
            <label className={styles.label}>{t('confirm_password')}</label>
            <input
              type="password"
              name="confirmpassword"
              className={styles.input}
              value={formik?.values.confirmpassword}
              onChange={formik?.handleChange}
            ></input>
            <p className={styles.error}>{formik?.errors.confirmpassword}</p>
          </div>
        </div>
        <div className={styles.boxWrapper}>
          <input type="submit" className={styles.button} value={t('register')}></input>
        </div>
      </form>
    </div>
  )
}

export default Index