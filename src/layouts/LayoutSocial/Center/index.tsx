import { Outlet } from 'react-router-dom'
import styles from './styles.module.scss'
function Index() {
  return (
    <div className={styles.container}>
      <Outlet></Outlet>
    </div>
  )
}

export default Index
