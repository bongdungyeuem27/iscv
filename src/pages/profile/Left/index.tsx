import { useQuery } from '@apollo/client'

import { IReqSkillsByEmployee, IResSkillsByEmployee, getSkillsByEmployee } from '@graphql/Skill'
import { useLocation, useParams } from 'react-router-dom'
import ItemSkill from './Panel/ItemSkill'
import Panel from './Panel/index'
import styles from './styles.module.scss'

function Index() {
  const location = useLocation()
  const id = Number(useParams().id)
  const querySkills = useQuery<IResSkillsByEmployee, IReqSkillsByEmployee>(getSkillsByEmployee, {
    variables: { employeeId: id }
  })

  return (
    <div className={styles.container}>
      {location.pathname.includes('profile') && (
        <Panel type={'skills'}>
          {querySkills.data?.skillsByEmployee?.map((value) => {
            return <ItemSkill key={value.id} title={value.title} level={value.level}></ItemSkill>
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

      {/* {location.pathname.includes('page') &&
        profile?.category == CATEGORY.igg.type && <IIGRequestPanel></IIGRequestPanel>} */}
    </div>
  )
}

export default Index
