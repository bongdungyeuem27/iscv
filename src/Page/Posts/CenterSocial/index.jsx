import React, { useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import { Web3Context } from '@context/Web3ContextProvider'
import StatusPanel from './StatusPanel'
import PostItem from '@component/PostItem'
import _ from 'lodash'
import { useParams, useLocation } from 'react-router-dom'
import { getContract as getContractEmployee } from '@contract/employeeController'
import { getContract as getContractBusiness } from '@contract/businessController'
import { ContentLoader } from '@component/ContentLoader'
// Page/Post/CenterSocial/index
function Index() {
  const { loginState } = useContext(Web3Context)
  const [list, setList] = useState()
  const location = useLocation()
  const params = useParams()
  const [info, setInfo] = useState()
  const id = parseInt(params.id)
  const [isLoading, setIsLoading] = useState(false)
  const pageGet = async () => {
    setIsLoading(true)
    await getContractBusiness()
      .then(async (contract) => {
        await contract.methods
          .getProfile(id)
          .call()
          .then((success) => setInfo({ ...success }))
          .catch((error) => console.error(error))
        await contract?.methods
          .getListPostOfBusiness(id, 1659312020, Date.now())
          .call()
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
  }
  useEffect(() => {
    if (location.pathname.toString().includes('page')) {
      pageGet()
    }
    if (location.pathname.toString().includes('profile')) {
    }
  }, [])
  return (
    <div className={styles.container}>
      {/* {id == loginState.id && location.pathname.includes('profile') && <StatusPanel></StatusPanel>} */}

      {info &&
        list &&
        list?.map((value, index) => {
          return (
            <PostItem
              key={index}
              id={id}
              {...value}
              typeFor={location.pathname.includes('profile') ? 'employee' : 'business'}
            ></PostItem>
          )
        })}
      {isLoading && <ContentLoader></ContentLoader>}
    </div>
  )
}

export default Index
