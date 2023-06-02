import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'
import { useState } from 'react'
import CompactItem from '../Components/CompactItem'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import Search from '../Components/Search'

function Index() {
  const { t } = useTranslation('page', { keyPrefix: 'messages.index' })
  const [expand, setExpand] = useState(true)
  const recent = useSelector((state: RootState) => state.messages.recent)
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search></Search>
      </div>
      <div className={styles.group}>
        <div className={styles.title}>
          <div className={clsx(styles.iconGroupName, { [styles.expand]: expand })}>
            <div className={styles.icon}>
              <i className="fa-solid fa-toggle-on" onClick={() => setExpand(!expand)}></i>
            </div>
            <div className={clsx(styles.name)}>{t('recently_messages')}</div>
          </div>
          <div className={styles.more}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>

        <div className={styles.main}>
          {recent.map((value) => {
            return <CompactItem key={value.id} data={value} expand={expand}></CompactItem>
          })}
        </div>
      </div>
    </div>
  )
}

export default Index
