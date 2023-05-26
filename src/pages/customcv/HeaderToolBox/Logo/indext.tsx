import logo from '@assets/LogoCV.png'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss'

function Logo() {
  return (
    <div className={styles.container}>
      <Link to={'/'}>
        <img alt="logo" src={logo}></img>
      </Link>
    </div>
  )
}

export default Logo
