import { useLocation, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import Todos from './Todos'

function Index() {
  const id = useParams().id
  const location = useLocation()

  return (
    <div className={styles.container}>
      {/* <Todos></Todos> */}
    </div>
  )
}

export default Index
