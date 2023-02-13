import { useLocation, useParams } from 'react-router-dom'
import styles from './styles.module.scss'

function Index() {
  const id = useParams().id
  const location = useLocation()

  return (
    <div className={styles.container}>

    </div>
  )
}

export default Index
