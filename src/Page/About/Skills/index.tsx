import { useState } from 'react'
import styles from './styles.module.scss'

import { useQuery } from '@apollo/client'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'
import { useEmployee } from '@contract/useEmployee'
import { GetEmployeeIdByUser, getEmployeeIdByUser } from '@graphql/Employee'
import { SkillsByEmployeeId, getSkillsByEmployeeId } from '@graphql/Skill'
import { Modal } from '@iscv/modal'
import { RootState } from '@redux/store'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as Yup from 'yup'
import Item from './Item'

function Index() {
  const id = useParams().id
  const account = useSelector((state: RootState) => state.auth.account)
  const signer = useSelector((state: RootState) => state.auth.signer)
  const [openAdd, setOpenAdd] = useState(false)
  const { data } = useQuery<GetEmployeeIdByUser>(
    getEmployeeIdByUser,
    {
      variables: { user: account },
      notifyOnNetworkStatusChange: true,
    }
  )
  const querySkills = useQuery<SkillsByEmployeeId>(getSkillsByEmployeeId, {
    variables: { employeeId: id },
  })
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })


  const toast = useToast()
  const loading = useLoading()
  const formik = useFormik({
    initialValues: {
      skill: '',
      level: 0,
    },
    validationSchema: Yup.object({
      skill: Yup.string().required(t('require')),
      level: Yup.number()
        .min(0, 'min0')
        .max(100, 'max100')
        .required(t('require'))
        .integer(t('integer')),
    }),
    onSubmit: async (values) => {
      if (!data?.employeeByUser.id) toast.error('please connect to metamask')
      loading.open()
      const employeeContract = useEmployee(signer!)
      ;(await employeeContract)
        .addSkill(data?.employeeByUser.id!, values.skill, values.level)
        .then((success) => {
          toast.success()
          querySkills.refetch()
          formik.resetForm()
          setOpenAdd(false)
        })
        .catch((error) => toast.error())
      loading.close()
    },
  })

  return (
    <>
      <Modal
        state={[openAdd, setOpenAdd]}
        title={t('add_skill')}
        action={() => {
          formik.handleSubmit()
        }}
      >
        <div className={styles.addSkillContainer}>
          <div className={styles.itemWrapper}>
            <label htmlFor="skill">{t('skill')}</label>
            <input
              type="text"
              name="skill"
              value={formik.values.skill}
              onChange={formik.handleChange}
            ></input>
            <p> {formik.errors.skill}</p>
          </div>
          <div className={styles.itemWrapper}>
            <label htmlFor="level">{t('level')}</label>
            <input
              type="number"
              name="level"
              value={formik.values.level}
              onChange={formik.handleChange}
            ></input>
            <p>{formik.errors.level}</p>
          </div>
        </div>
      </Modal>

      <div className={styles.container}>
        <div className={styles.skills}>
          <div className={styles.title}>
            <div className={styles.titleText}>{t('skills')}</div>
            <div className={styles.toolTitle}>
              {data?.employeeByUser.id === id && (
                <div onClick={() => setOpenAdd(true)} className={styles.toolTitleWrapper}>
                  <i className="fa-solid fa-plus"></i>
                </div>
              )}
            </div>
          </div>
          {querySkills.data?.skillsByEmployeeId.map((value, index) => {
            return (
              <Item
                key={index}
                id={value.id}
                owner={data?.employeeByUser.id === id}
                employeeId={value.employeeId}
                skill={value.title}
                level={value.level}
              ></Item>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Index