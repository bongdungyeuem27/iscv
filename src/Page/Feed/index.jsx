import React, { useState, useEffect, useContext } from 'react'
import styles from './styles.module.scss'
import PostItem from '../../Component/PostItem'
import Search from './Search'
import { getContract as getContractBusiness } from '@contract/businessController'
import _ from 'lodash'
import { ContentLoader } from '@component/ContentLoader'
import { useTranslation } from 'react-i18next'
import SearchModal from './SearchModal'
import { prediction } from '@api/employee/prediction'
import { Web3Context } from '@context/Web3ContextProvider'

function Index() {
  const { loginState } = useContext(Web3Context)
  const [list, setList] = useState()
  const [listPrediction, setListPrediction] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const [openSearch, setOpenSearch] = useState(false)
  const { t } = useTranslation('page', { keyPrefix: 'feed.index' })
  // useEffect(() => {
  //   getContractBusiness()
  //     .then((contractBusiness) => {
  //       contractBusiness.methods
  //         .getAllPost()
  //         .call()
  //         .then(async (success) => {
  //           let temp = []
  //           console.log(success)
  //           success.map((value) => {
  //             temp.push({ ...value })
  //           })

  //           setList(temp)
  //         })
  //     })
  //     .catch((error) => console.log(error))
  // }, [])
  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      if (loginState.for == 'employee') {
        await prediction(loginState.id)
          .then((success) => {
            console.log(success.data.post)
            setListPrediction(success.data.post)
          })
          .catch((error) => console.log(error))
      }
      setIsLoading(false)
    })()
  }, [])
  return (
    <>
      <SearchModal state={[openSearch, setOpenSearch]}></SearchModal>
      <div className={styles.container}>
        <Search onClick={() => setOpenSearch(true)}></Search>
        {listPrediction && (
          <div className={styles.prediction}>
            <div className={styles.predictionTitle}>{t('suggestion')}</div>
            <div className={styles.predictionContent}>
              {listPrediction
                ?.map((value, index) => {
                  return <PostItem key={index} {...value} typeFor="business"></PostItem>
                })
                .reverse()}
            </div>
          </div>
        )}
        {isLoading && <ContentLoader></ContentLoader>}

        {/* <div className={styles.list}>
          {list
            ?.map((value, index) => {
              return <PostItem key={index} {...value} typeFor="business"></PostItem>
            })
            .reverse()}
        </div> */}
      </div>
    </>
  )
}

export default Index
