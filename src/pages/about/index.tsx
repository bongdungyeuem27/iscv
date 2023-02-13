import { useLocation } from 'react-router-dom'
import Infos from './Infos'
import Skills from './Skills'
import styles from './styles.module.scss'
function Index() {
  const location = useLocation()
  return (
    <div className={styles.container}>
      <Infos></Infos>
      {location.pathname.includes('profile') && <Skills></Skills>}
    </div> 
  )
}

export default Index
