import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { useParams } from 'react-router-dom'
import Group from '../Group'
import Education from '../Education'
import Contract from '../Contract'
import Social from '../Social'
import Skill from '../Skill'
import Certificate from '../Certificate'
import Avatar from '../Avatar'
import { useTranslation } from 'react-i18next'

function Index() {
  const id = useParams().id
  const [profile, setProfile] = useState()
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  useEffect(() => {
    getContractEmployee()
      .then((contractEmployee) => {
        contractEmployee.methods
          .getProfile(id)
          .call()
          .then((success) => {
            setProfile({ ...success })
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => console.error(error))
  }, [])
  return (
    <>
      {profile && (
        <div className={styles.cv}>
          <div className={styles.left}>
            <div className={styles.top}>
              <div className={styles.promotion}>{t('cv_design_by_uit')}</div>
              <div className={styles.name}>{profile.name}</div>
              <div className={styles.slogan}>
                <div className={styles.sloganItem}>
                  <div className={styles.arrowSlogun}></div>
                </div>
              </div>
            </div>

            <div className={styles.mainLeft}>
              <Group></Group>
              <Group type="positive" title={t('education')}>
                <Education></Education>
              </Group>
              <Group type="positive" title={t('skills')}>
                <Skill id={id}></Skill>
              </Group>
              <Group type="positive" title={t('certificates')}>
                <Certificate id={id}></Certificate>
              </Group>

              <Group type="positive"></Group>
            </div>
          </div>

          <div className={styles.right}>
            <Avatar id={id}></Avatar>

            <div className={styles.rightInfo}>
              <Group type="negative" title={t('contract')}>
                <Contract {...profile}></Contract>
              </Group>
              <Group type="negative" title={t('social')}>
                <Social {...profile}></Social>
              </Group>
              <Group type="negative"></Group>
              <Group type="negative"></Group>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Index
