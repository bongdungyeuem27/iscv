import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Item from './Item'
import { getContract as getContractBusiness } from '@contract/businessController'
import { Web3Context } from '@context/Web3ContextProvider'
import Navigation from '../../Components/Navigation'
import { useTranslation } from 'react-i18next'
import { ContentLoader } from '@component/ContentLoader'

function Index() {
  const { loginState } = useContext(Web3Context)
  const [list, setList] = useState()
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.posts' })
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      await getContractBusiness()
        .then(async (contract) => {
          await contract.methods
            .getListPostOfBusiness(loginState.id, 1659312020, Date.now())
            .call({ from: loginState.address })
            .then((success) => {
              let temp = []
              _.forEach(success, (value, index) => {
                temp.push({ ...value })
              })
              temp = _.orderBy(temp, (o) => parseInt(o.time), 'desc')
              setList(temp)
            })
            .catch((error) => {
              console.error(error)
            })
        })
        .catch((error) => console.log(error))
      setIsLoading(false)
    })()
  }, [])
  return (
    <>
      <div className={styles.container}>
        <Navigation title={t('manager_posts')}></Navigation>
        <div className={styles.tool}>
          <Link to="/dashboard?tab=posts&create=true" className={styles.create}>
            {t('create_post')}
          </Link>
        </div>
        <div className={styles.tableWrapper}>
          <div className={styles.panel}>
            <table cellSpacing="0">
              <tr>
                <th>{t('post_name')}</th>
                <th>{t('date')}</th>
                <th>{t('status')}</th>
                <th>{t('content')}</th>
                <th>{t('applied')}</th>
              </tr>

              {list?.map((value, index) => {
                return <Item key={index} {...value}></Item>
              })}
              {isLoading && (
                <tr>
                  <td colSpan={'100%'}>
                    <ContentLoader></ContentLoader>
                  </td>
                </tr>
              )}
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index
