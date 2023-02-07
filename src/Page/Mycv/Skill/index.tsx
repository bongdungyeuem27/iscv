import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { ProgressBar } from '@component/ProgressBar'
import { getContract as getContractEmployee } from '@contract/employeeController'
import _ from 'lodash'
import { Skill } from '@graphql/Skill'

function Index({ list }: { list: Skill[] }) {
  return (
    <div className={styles.container}>
      <div className={styles.group}>
        {list.map((value, index) => {
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
