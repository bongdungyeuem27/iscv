import { useTranslation } from 'react-i18next'
import Name from '../Components/Name'
import Group from './Group'
import styles from './styles.module.scss'

function Index() {

  const { t } = useTranslation('page', { keyPrefix: 'messages.index' })
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        {/* <Name
          avatar={loginState.profile.avatar}
          title={loginState.profile.name}
          info={t('hello')}
        ></Name> */}
        <div className={styles.tools}>
          <button className={styles.plus}>
            <i className="fa-regular fa-plus"></i>
          </button>
          <button className={styles.search}>
            <i className="fa-regular fa-search"></i>
          </button>
        </div>
      </div>
      <Group></Group>
    </div>
  )
}

export default Index
