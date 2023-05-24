import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'
import { CUSTOMCVDIMENSION } from './CVCustom/config'
import Left from './Left'
import Right from './Right'
import { routes } from './config'
import styles from './styles.module.scss'
function Index() {
  const params = useParams()
  const id = params.id
  const [searchParams] = useSearchParams()
  const employee = useSelector((state: RootState) => state.auth.employee)
  const tab = searchParams.get('tab')

  const owner = employee?.id == id
  return (
    <div className={styles.container}>
      <Left owner={owner}></Left>
      <div
        id="mycv"
        style={{ width: CUSTOMCVDIMENSION.WIDTH, height: CUSTOMCVDIMENSION.HEIGHT }}
        className={styles.main}
      >
        {Object(routes)[tab!] ? Object(routes)[tab!].element : routes['default'].element}
      </div>
      <Right></Right>
    </div>
  )
}

export default Index
