import React, { useState, useContext, useEffect } from 'react'
import styles from './styles.module.scss'
import Modal from '@component/Modal'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Web3Context } from '@context/Web3ContextProvider'
import { useToast } from '@component/Toast'
import Item from './Item'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useParams } from 'react-router-dom'
import { useLoading } from '@component/Loading'
import { useTranslation } from 'react-i18next'
import trimMultipleSpace from '@helper/trimMultipleSpace'

function Index() {
  const { loginState } = useContext(Web3Context)
  const [openAdd, setOpenAdd] = useState(false)
  const [forceUpdate, setForceUpdate] = useState(false)
  const [listKills, setListSkills] = useState()
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })
  const id = useParams().id
  const owner = id == loginState.id
  const toast = useToast()
  const loading = useLoading()
  const formik = useFormik({
    initialValues: {
      skill: '',
      level: 0,
    },
    validationSchema: Yup.object({
      skill: Yup.string().required(t('require')),
      level: Yup.number(t('number'))
        .min(0, 'min0')
        .max('100', 'max100')
        .required(t('require'))
        .integer(t('integer')),
    }),
    onSubmit: async (values) => {
      loading.open()
      await getContractEmployee()
        .then(async (contractEmployee) => {
          await contractEmployee.methods
            ._checkExistSkill(
              loginState.id,
              trimMultipleSpace(values.skill.toString().toUpperCase().trim())
            )
            .call()
            .then(async (exists) => {
              if (exists) {
                toast.info(t('exists_skill'), { pauseOnHover: true, closeOnClick: true })
                return
              }
              await contractEmployee.methods
                .addSkill(
                  loginState.id,
                  trimMultipleSpace(values.skill.toString().toUpperCase().trim()),
                  values.level
                )
                .send({ from: loginState.address })
                .then((success) => {
                  toast.success('', { pauseOnHover: true, closeOnClick: true })
                  setOpenAdd(false)
                  setForceUpdate(!forceUpdate)
                })
                .catch((error) => {
                  console.log(error)
                  toast.error('', { pauseOnHover: true, closeOnClick: true })
                })
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

  useEffect(() => {
    getContractEmployee()
      .then((contractEmployee) => {
        contractEmployee.methods
          .getListSkillOfEmployee(id)
          .call()
          .then((success) => {
            setListSkills(success)
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => {
        console.error(error)
      })
  }, [forceUpdate])
  return (
    <>
      <Modal state={[openAdd, setOpenAdd]} title={t('add_skill')} action={formik.handleSubmit}>
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
            <div className={styles.titleText}>{t("skills")}</div>
            <div className={styles.toolTitle}>
              <div onClick={() => owner && setOpenAdd(true)} className={styles.toolTitleWrapper}>
                <i className="fa-solid fa-plus"></i>
              </div>
            </div>
          </div>
          {listKills?.map((value, index) => {
            return (
              <Item
                key={index}
                id={value.id}
                owner={owner}
                skillId={value.skillId}
                skill={value.title}
                level={value.level}
                forceUpdate={forceUpdate}
                setForceUpdate={setForceUpdate}
              ></Item>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Index
