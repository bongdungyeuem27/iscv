import { useQuery } from '@apollo/client'
import avatar from '@assets/avatar.png'
import cover from '@assets/cover.png'
import { IPFS_GATEWAY } from '@constants/index'
import { GetEmployee, getEmployee } from '@graphql/Employee'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link, NavLink, Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import styles from './styles.module.scss'

function ProfileLayout() {
  const location = useLocation()
  const params = useParams()
  const id = Number(params.id)
  const { t } = useTranslation('layout', { keyPrefix: 'personal.index' })
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery<
    GetEmployee,
    { employeeId: number }
  >(getEmployee, {
    variables: { employeeId: id },
  })
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
            <img
              src={
                data?.employee?.sourceImage
                  ? `${IPFS_GATEWAY}${data?.employee?.sourceImage}`
                  : avatar
              }
            ></img>
            <div className={styles.nameGroup}>
              <div className={styles.name}>{data?.employee?.name}</div>
              {/* {loginState.for == 'business' && (
                <Link to={`/messages/profile/${id}`} className={styles.messages}>
                  {t('messages')}
                </Link>
              )} */}
            </div>
          </div>
        </div>
        <div className={styles.tableWrapper}>
          <NavLink
            to={{ pathname: `/profile/${id}` }}
            className={clsx(styles.tab, { [styles.active]: location.pathname == `/profile/${id}` })}
          >
            {t('posts')}
          </NavLink>
          <NavLink
            to={{ pathname: `/profile/${id}/mycv` }}
            className={({ isActive }) =>
              clsx(styles.tab, {
                [styles.active]: isActive,
              })
            }
          >
            {t('mycv')}
          </NavLink>
          <NavLink
            to={{ pathname: `/profile/${id}/about` }}
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

export default ProfileLayout
