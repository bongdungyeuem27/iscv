import { calculate } from '@api/employee/joblevel'
import { CATEGORY } from '@constant/businessConst'
import { Web3Context } from '@context/Web3ContextProvider'
import { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { PostsContext } from '../PostsContext'
import IIGRequestPanel from './IIGRequestPanel'
import Panel from './Panel'
import styles from './styles.module.scss'
import { getContract as getContractEmployee } from '@contract/employeeController'
import ItemSkill from './Panel/ItemSkill'
import ItemJobLevel from './Panel/ItemJobLevel'
import { useQuery } from '@apollo/client'
import { SkillsByEmployeeId, getSkillsByEmployeeId } from '@graphql/Skill'

function Index() {
  const { profile } = useContext(PostsContext)
  const location = useLocation()
  const id = useParams().id
  const querySkills = useQuery<SkillsByEmployeeId>(getSkillsByEmployeeId, {
    variables: { employeeId: id },
  })

  // useEffect(() => {
  //   ;(async () => {
  //     if (location.pathname.includes('profile')) {
  //       const body = await calculate(id).catch((error) => console.error(error))
  //       setListJobLevel(body.data.level)
  //       setListJobPoints(body.data.point)
  //     }
  //   })()
  // }, [])
  return (
    <div className={styles.container}>
      {location.pathname.includes('profile') && (
        <Panel type={'skills'}>
          {querySkills.data?.skillsByEmployeeId?.map((value, index) => {
            return <ItemSkill key={index} title={value.title} level={value.level}></ItemSkill>
          })}
        </Panel>
      )}
      {/* {location.pathname.includes('profile') && (
        <Panel type={'joblevels'}>
          {listJobLevel &&
            Object.keys(listJobLevel).map(
              (key) =>
                listJobLevel[key] !== 'Unknown' && (
                  <ItemJobLevel key={key} title={key} level={listJobLevel[key]} point={listJobPoints[key]} ></ItemJobLevel>
                )
            )}
        </Panel>
      )} */}
      {/* {location.pathname.includes('profile') && (
        <Panel type={'jobpoints'}>
          {listJobLevel &&
            Object.keys(listJobPoints).map(
              (key) =>
                listJobLevel[key] != 0 && (
                  <ItemJobLevel key={key} title={key} level={listJobPoints[key]}></ItemJobLevel>
                )
            )}
        </Panel>
      )} */}

      {location.pathname.includes('page') &&
        profile?.category == CATEGORY.igg.type && <IIGRequestPanel></IIGRequestPanel>}
    </div>
  )
}

export default Index
