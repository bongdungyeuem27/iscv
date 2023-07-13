import avatar from '@assets/avatar.png'
import cover from '@assets/cover.png'
import { IPFS_GATEWAY } from '@constants/index'
import { useGetBusinessLazyQuery } from '@graphql/generated/schema'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom'
import styles from './styles.module.scss'

function LayoutPage() {
  const location = useLocation()
  const params = useParams()
  const id = Number(params.id)
  const { t } = useTranslation('layout', { keyPrefix: 'personal.index' })
  const employee = useSelector((state: RootState) => state.auth.employee)
  const [getData, { data }] = useGetBusinessLazyQuery({
    variables: {
      businessId: id
    }
  })
  useEffect(() => {
    if (employee?.id === undefined || employee?.id === null) return
    getData()
  }, [employee?.id])
  return (
    <>
      <main className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.cover}>
            <img src={cover} className={styles.image}></img>
          </div>
          <div className={styles.avatarWrapper}>
            <img src={`${IPFS_GATEWAY}${data?.business?.sourceImage}` ?? avatar}></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{data?.business?.name}</div>

              <Link to={`/messages?business_id=${id}`} className={styles.messages}>
                {t('messages')}
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <NavLink
            to={{ pathname: `/page/${id}` }}
            className={clsx(styles.tab, {
              [styles.active]: location.pathname == `/page/${id}`
            })}
          >
            {t('posts')}
          </NavLink>
          {/* <NavLink
            to={{ pathname: `/page/${id}/about` }}
            className={({ isActive }) =>
              clsx(styles.tab, {
                [styles.active]: isActive
              })
            }
          >
            {t('about')}
          </NavLink> */}
        </div>
        <Outlet></Outlet>
      </main>
    </>
  )
}

export default LayoutPage
