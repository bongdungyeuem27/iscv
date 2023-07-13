import { useLoading } from '@components/Loading'
import { QueryResult, useQuery } from '@apollo/client'
import { ProgressBar } from '@components/ProgressBar'
import { useToast } from '@iscv/toast'
import { useEmployee } from '@contracts/useEmployee'

import { Modal } from '@iscv/modal'
import { RootState } from '@redux/store'
import { useFormik } from 'formik'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import styles from './styles.module.scss'
import {
  Exact,
  IGetSkillsByEmployeeQuery,
  useGetSkillsByEmployeeQuery
} from '@graphql/generated/schema'

function Item({
  id,
  owner,
  skill,
  querySkills,
  level,
  employeeId
}: {
  id: number
  owner: boolean
  skill: string
  querySkills: QueryResult<
    IGetSkillsByEmployeeQuery,
    Exact<{
      employeeId: number
    }>
  >
  employeeId: number
  level: number
}) {
  const signer = useSelector((state: RootState) => state.auth.signer)
  const [openEdit, setOpenEdit] = useState(false)
  const loading = useLoading()
  const toast = useToast()

  const { t } = useTranslation('page', { keyPrefix: 'about.index' })

  const formik = useFormik({
    initialValues: {
      skill: skill,
      level: level
    },
    validationSchema: Yup.object({
      skill: Yup.string().required(t('require')),
      level: Yup.number()
        .required('require')
        .min(0, t('min0'))
        .max(100, t('max100'))
        .integer(t('integer'))
    }),
    onSubmit: async (values) => {
      loading.open()
      const contractEmployee = useEmployee(signer!)
      const tx = await contractEmployee
        .editSkill(employeeId, id, values.level)
        .catch((error) => console.log(error))
      await tx
        ?.wait()
        .then((success) => {
          toast.success()
          querySkills.refetch()
          formik.resetForm()
          setOpenEdit(false)
        })
        .catch((error) => {
          console.error(error)
          toast.error()
        })

      loading.close()
    }
  })

  // const handleDelete = useCallback(async () => {
  //   loading.open()
  // }, [loginState])

  return (
    <>
      {/* <Modal
        state={[openDelete, setOpenDelete]}
        title={t('delete_skill')}
        actionText={t('delete')}
        action={handleDelete}
      >
        <p className={styles.delete}>{t('are_you_sure_to_delete_this_skill')}</p>
      </Modal> */}
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
          <p>{formik.errors.skill?.toString()}</p>
        </div>
        <div className={styles.editContainer}>
          <label htmlFor="level">{t('new_level')}</label>
          <input
            type="number"
            name="level"
            value={formik.values.level}
            onChange={formik.handleChange}
          ></input>
          <p>{formik.errors.level?.toString()}</p>
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
            {/* <i onClick={() => setOpenDelete(true)} className="fa-solid fa-trash-can"></i> */}
          </span>
        )}
      </div>
    </>
  )
}

export default Item
