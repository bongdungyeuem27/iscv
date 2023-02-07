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
import { useQuery } from '@apollo/client'
import { GetCV, getCV } from '@graphql/Employee'

function Index() {
  const id = useParams().id
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery<GetCV>(getCV, {
    variables: { employeeId: id },
    notifyOnNetworkStatusChange: true,
  })
  console.log(data)
  const { t } = useTranslation('page', { keyPrefix: 'mycv.index' })
  if (!data) return null
  return (
    <div className={styles.cv}>
      <div className={styles.left}>
        <div className={styles.top}>
          <div className={styles.promotion}>{t('cv_design_by_uit')}</div>
          <div className={styles.name}>{data.cv.name}</div>
          {/* <div className={styles.slogan}>
                <div className={styles.sloganItem}>
                  <div className={styles.arrowSlogun}></div>
                </div>
              </div> */}
        </div>

        <div className={styles.mainLeft}>
          {/* <Group></Group> */}
          <Group type="positive" title={t('education')}>
            <Education></Education>
          </Group>
          <Group type="positive" title={t('skills')}>
            <Skill list={data.cv.skills}></Skill>
          </Group>
          <Group type="positive" title={t('certificates')}>
            {/* <Certificate id={id}></Certificate> */}
          </Group>
        </div>
      </div>

      <div className={styles.right}>
        <Avatar id={id!} cid={data.cv.sourceImage}></Avatar>

        <div className={styles.rightInfo}>
          <Group type="negative" title={t('contract')}>
            <Contract email={data.cv.email} phone={data.cv.phone}></Contract>
          </Group>
          <Group type="negative" title={t('social')}>
            <Social github={data.cv.github} linkedin={data.cv.linkedin}></Social>
          </Group>
          {/* <Group type="negative"></Group>
              <Group type="negative"></Group> */}
        </div>
      </div>
    </div>
  )
}

export default Index
