import { useQuery } from '@apollo/client'
import avatar from '@assets/avatar.png'
import cover from '@assets/cover.png'
import { IPFS_GATEWAY } from '@constants/index'
import { GetEmployee, getEmployee } from '@graphql/Employee'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import styles from './styles.module.scss'
import { GetBusiness, getBusiness } from '@graphql/Business'

function LayoutPage() {
  const location = useLocation()
  const params = useParams()
  const id = Number(params.id)
  const { t } = useTranslation('layout', { keyPrefix: 'personal.index' })
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery<GetBusiness>(
    getBusiness,
    {
      variables: { id: id },
    }
  )
  const owner = id == data?.business.id
  if (!loading && !data)
    return (
      <div>
        <Navigate to="/404" replace></Navigate>
      </div>
    )
  return (
    <>
      <section className={styles.container}>
        <div className={styles.panel}>
          <div className={styles.cover}>
            <img src={cover} className={styles.image}></img>
          </div>
          <div className={styles.avatarWrapper}>
            <img src={`${IPFS_GATEWAY}${data?.business.sourceImage}` ?? avatar}></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{data?.business.name}</div>
              {!owner && (
                <Link to={`/messages/profile/${id}`} className={styles.messages}>
                  {t('messages')}
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <NavLink
            to={{ pathname: `/page/${id}` }}
            className={clsx(styles.tab, { [styles.active]: location.pathname == `/page/${id}` })}
          >
            {t('posts')}
          </NavLink>
          <NavLink
            to={{ pathname: `/page/${id}/mycv` }}
            className={({ isActive }) =>
              clsx(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            {t('mycv')}
          </NavLink>
          <NavLink
            to={{ pathname: `/page/${id}/about` }}
            className={({ isActive }) =>
              clsx(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            {t('about')}
          </NavLink>
        </div>
        <Outlet></Outlet>
      </section>
    </>
  )
}

export default LayoutPage