import React, { useState, useContext, useCallback } from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'
import Modal from '@component/Modal'
import { Web3Context } from '@context/Web3ContextProvider'
import { useToast } from '@component/Toast'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useLoading } from '@component/Loading'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useTranslation } from 'react-i18next'

function Item({ id, owner, skill, level, skillId, forceUpdate, setForceUpdate }) {
  const { loginState } = useContext(Web3Context)
  const [openDelete, setOpenDelete] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const loading = useLoading()
  const toast = useToast()
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })
  const formik = useFormik({
    initialValues: {
      skill: skill,
      level: level,
    },
    validationSchema: Yup.object({
      skill: Yup.string().required(t('require')),
      level: Yup.number('number')
        .required('require')
        .min(0, t('min0'))
        .max(100, t('max100'))
        .integer(t('integer')),
    }),
    onSubmit: async (values) => {
      loading.open()
      await getContractEmployee()
        .then(async (contractEmployee) => {
          await contractEmployee.methods
            .editSkill(parseInt(id), parseInt(skillId), parseInt(values.level))
            .send({ from: loginState.address })
            .then((success) => {
              toast.success('success', { pauseOnHover: true, closeOnClick: true })
              setForceUpdate((e) => !e)
              setOpenEdit(false)
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => {
          console.error(error)
        })

      loading.close()
    },
  })

  const handleDelete = useCallback(async () => {
    loading.open()
    await getContractEmployee()
      .then(async (contractEmployee) => {
        await contractEmployee.methods
          .removeSkill(id, skillId)
          .send({ from: loginState.address })
          .then((success) => {
            toast.success('', { pauseOnHover: true, closeOnClick: true })
            setOpenDelete(false)
            setForceUpdate(!forceUpdate)
          })
          .catch((error) => {
            console.log(error)
            toast.error('', { pauseOnHover: true, closeOnClick: true })
          })
      })
      .catch((error) => console.error(error))
    loading.close()
  }, [loginState])

  return (
    <>
      <Modal
        state={[openDelete, setOpenDelete]}
        title={t('delete_skill')}
        actionText={t('delete')}
        action={handleDelete}
      >
        <p className={styles.delete}>{t('are_you_sure_to_delete_this_skill')}</p>
      </Modal>
      <Modal state={[openEdit, setOpenEdit]} title={t('edit_skill')} action={formik.handleSubmit}>
        <div className={styles.editContainer}>
          <label htmlFor="skill">{t('skill')}</label>
          <input
            type="text"
            name="skill"
            value={formik.values.skill}
            onChange={formik.handleChange}
            disabled={true}
          ></input>
          <p>{formik.errors.skill}</p>
        </div>
        <div className={styles.editContainer}>
          <label htmlFor="level">{t('new_level')}</label>
          <input
            type="number"
            name="level"
            value={formik.values.level}
            onChange={formik.handleChange}
          ></input>
          <p>{formik.errors.level}</p>
        </div>
      </Modal>
      <div className={styles.itemWrapper}>
        <span className={styles.item}>
          <div className={styles.iconWrapper}>
            <label> {skill}</label>
          </div>
          <a className={styles.percent}>{level}%</a>
          <div className={styles.progressBar}>
            <ProgressBar percent={level}></ProgressBar>
          </div>
        </span>
        {owner && (
          <span className={styles.tool}>
            <i onClick={() => setOpenEdit(true)} className="fa-solid fa-pen-to-square"></i>
            <i onClick={() => setOpenDelete(true)} className="fa-solid fa-trash-can"></i>
          </span>
        )}
      </div>
    </>
  )
}

export default Item
