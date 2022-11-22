import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'
import { getContract as getContractEmployee } from '@contract/employeeController'
import _ from 'lodash'

function Index({ id }) {
  const [list, setList] = useState()
  useEffect(() => {
    getContractEmployee().then((contractEmployee) =>
      contractEmployee.methods
        .getListSkillOfEmployee(id)
        .call()
        .then((success) => {
          let temp = []
          _.forEach(success, (value, index) => {
            temp.push({ ...value })
          })
          setList(temp)
        })
        .catch((error) => console.error(error))
    )
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {list?.map((value, index) => {
          return (
            <div key={index} className={styles.item}>
              <div className={styles.itemTitle}>
                <div className={styles.title}>{value.title}</div>
                <div className={styles.level}>{value.level}%</div>
              </div>
              <ProgressBar percent={Math.round(value.level)}></ProgressBar>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Index
