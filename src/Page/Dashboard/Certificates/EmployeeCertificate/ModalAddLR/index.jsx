import React, { useState, useLayoutEffect, useContext, useEffect, useReducer } from 'react'
import { Modal } from '@iscv/modal'
import styles from '../styles.module.scss'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Web3Context } from '@context/Web3ContextProvider'
import { useToast } from '@component/Toast'
import { getContract as getContractIIG } from '@contract/iigController'
import { useLoading } from '@component/Loading'
import { useFormik } from 'formik'
import * as Yup from 'yup'

export default function Index({ state, request, profile }) {
  const [open, setOpen] = state
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.employeeCertificate' })
  const { loginState } = useContext(Web3Context)
  const loading = useLoading()
  const toast = useToast()

  const formik = useFormik({
    initialValues: {
      shiftTest: undefined,
      expireDate: undefined,
      testDate: undefined,
      listeningScore: undefined,
      readingScore: undefined,
    },
    validationSchema: Yup.object({
      shiftTest: Yup.number()
        .required(t('require'))
        .min(1, t('min1'))
        .max(4, t('max4'))
        .integer(t('integer')),
      expireDate: Yup.date()
        .required(t('require'))
        .test(
          'expireDate',
          t('greater_equal_now'),
          (value) => new Date(value).getTime() >= new Date().getTime()
        ),
      testDate: Yup.date()
        .required(t('require'))
        .test(
          'testDate',
          t('less_equal_now'),
          (value) => new Date(value).getTime() <= new Date().getTime()
        ),
      listeningScore: Yup.number()
        .test('devisible 5', t('divisible_by_5'), (number) => parseInt(number % 5) == 0)
        .required(t('require'))
        .min(0, t('min0'))
        .max(495, t('max495'))
        .integer(t('integer')),
      readingScore: Yup.number()
        .required(t('require'))
        .min(0, t('min0'))
        .max(495, t('max495'))
        .integer(t('integer'))
        .test('devisible 5', t('divisible_by_5'), (number) => parseInt(number % 5) == 0),
    }),
    onSubmit: async (values) => {
      loading.open()
      await getContractIIG()
        .then(async (contractIIG) => {
          await contractIIG.methods
            .addLRResult(
              parseInt(request.businessId),
              parseInt(request.employeeId),
              new Date(values.testDate).getTime(),
              parseInt(values.shiftTest),
              new Date(values.expireDate).getTime(),
              parseInt(values.listeningScore),
              parseInt(values.readingScore),
              parseInt(request.requestId)
            )
            .send({ from: loginState.address })
            .then((success) => {
              toast.success('success', { pauseOnHover: true, closeOnClick: true })
              setOpen(false)
            })
            .catch((error) => console.error(error))
        })
        .catch((error) => console.log(error))
      loading.close()
    },
  })
  return (
    <>
      <Modal
        state={[open, setOpen]}
        action={formik.handleSubmit}
        actionText={t('add')}
        title={t('add_a_listening_reading_certificate')}
      >
        <div className={styles.modalContainer}>
          <div className={styles.content}>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>Name</label>
              <a className={clsx(styles.input, styles.addressTitle)}>{profile.name}</a>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('id')}</label>
              <a className={clsx(styles.input, styles.addressTitle)}>{profile.idCardNumber}</a>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('test_date')}</label>
              <input
                type="date"
                name="testDate"
                id="testDate"
                className={styles.input}
                value={formik.values.testDate}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.testDate}</p>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('test_shift')}</label>
              <input
                type="number"
                name="shiftTest"
                id="shiftTest"
                className={styles.input}
                value={formik.values.shiftTest}
                placeholder={`${t('enter')} ${t('test_shift').toLowerCase()}`}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.shiftTest}</p>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('expire_date')}</label>
              <input
                type="date"
                name="expireDate"
                id="expireDate"
                className={styles.input}
                value={formik.values.expireDate}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.expireDate}</p>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('listening_score')}</label>
              <input
                type="number"
                name="listeningScore"
                id="listeningScore"
                className={styles.input}
                value={formik.values.listeningScore}
                placeholder={`${t('enter')} ${t('listening_score').toLowerCase()}`}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.listeningScore}</p>
            </div>
            <div className={styles.inputWrapper}>
              <label className={styles.label}>{t('reading_score')}</label>
              <input
                type="number"
                name="readingScore"
                id="readingScore"
                className={styles.input}
                placeholder={`${t('enter')} ${t('listening_score').toLowerCase()}`}
                value={formik.values.readingScore}
                onChange={formik.handleChange}
              ></input>
              <p className={styles.error}>{formik.errors.readingScore}</p>
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
