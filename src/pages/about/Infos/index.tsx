import { useGetEmployeeQuery } from '@graphql/generated/schema'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import Item from './Item'
import styles from './styles.module.scss'
function Index() {
  const id = Number(useParams().id)
  if (Number.isNaN(id)) return <></>
  const { loading, error, data, refetch, subscribeToMore } = useGetEmployeeQuery({
    variables: { employeeId: id }
  })
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
