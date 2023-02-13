import { useQuery } from '@apollo/client'
import { EmployeeByUserData, GetEmployee, getEmployee } from '@graphql/Employee'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import Item from './Item'
import styles from './styles.module.scss'
function Index() {
  const id = Number(useParams().id)
  const { data } = useQuery<GetEmployee>(getEmployee, {
    variables: { employeeId: id },
  })
  const location = useLocation()
  const { t } = useTranslation('page', { keyPrefix: 'about.index' })

  return (
    <div className={styles.personalWrapper}>
      {data?.employee && (
        <div className={styles.personal}>
          <div className={styles.title}>{t('personal')}</div>
          {Object.keys(data.employee).map((key) => {
            if (
              !Number.isInteger(parseInt(key)) &&
              key != '__typename' &&
              key != 'category' &&
              key != 'id' &&
              key != 'idCardNumber' &&
              key != 'sourceImage'
            )
              return <Item key={key} label={key} value={Object(data.employee)[key]}></Item>
          })}
        </div>
      )}
    </div>
  )
}

export default Index
