import React, { useContext, useState, useEffect } from 'react'
import styles from './styles.module.scss'
import PostItem from '@component/PostItem'
import ItemRequest from './ItemRequest'
import { Link, useSearchParams } from 'react-router-dom'
import { getContract as getContractBusiness } from '@contract/businessController'
import { Web3Context } from '@context/Web3ContextProvider'
import _ from 'lodash'
import Navigation from '../../Components/Navigation'
import { getImage as getBusinessPostImage } from '@api/business/post'
import { useTranslation } from 'react-i18next'
import * as applyApi from '@api/business/apply'
import { ContentLoader } from '@component/ContentLoader'

// Dashboard/ViewPost/index
function Index() {
  const { loginState } = useContext(Web3Context)
  const [post, setPost] = useState()
  const [searchParams] = useSearchParams()
  const postBusinessId = searchParams.get('businessPostId')
  const [listNew, setListNew] = useState([])
  const [listSeen, setListSeen] = useState([])
  const [isLoadingNew, setIsLoadingNew] = useState(false)
  const [isLoadingSeen, setIsLoadingSeen] = useState(false)
  const { t } = useTranslation('page', { keyPrefix: 'dashboard.posts' })
  const getPost = () => {
    getContractBusiness()
      .then((contract) => {
        contract.methods
          .getPost(postBusinessId)
          .call()
          .then(async (success) => {
            let imageTemp = undefined
            await getBusinessPostImage(success.id, success.imageSource)
              .then((image) => {
                imageTemp = image
              })
              .catch((error) => console.error(error))
            setPost({ ...success, image: imageTemp })
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))
  }

  const loadNew = async () => {
    setIsLoadingNew(true)
    await applyApi
      .getNotseen(postBusinessId)
      .then((success) => {
        setListNew(success.data)
      })
      .catch((error) => {
        console.error(error)
      })
    setIsLoadingNew(false)
  }
  const loadSeen = async () => {
    setIsLoadingSeen(true)
    await applyApi
      .getSeen(postBusinessId)
      .then((success) => setListSeen(success.data))
      .catch((error) => console.error(error))
    setIsLoadingSeen(false)
  }
  useEffect(() => {
    getPost()
    loadNew()
    loadSeen()
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navigation title={t('view_post')} to={-1}></Navigation>
        <div className={styles.preview}>
          {post && (
            <PostItem
              key={0}
              id={loginState.id}
              name={loginState.profile.name}
              typeFor={'business'}
              {...post}
            ></PostItem>
          )}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.title}>
          <p>{t('request')}</p>
        </div>
        <div className={styles.content}>
          <div className={styles.group}>
            <div className={styles.top}>
              <div className={styles.name}>{t('new')}</div>
            </div>
            <div className={styles.wrapper}>
              {post &&
                listNew?.map((value, index) => {
                  return <ItemRequest key={index} {...value} job={post.job}></ItemRequest>
                })}
              {isLoadingNew && <ContentLoader></ContentLoader>}
            </div>
          </div>
          <div className={styles.group}>
            <div className={styles.top}>
              <div className={styles.name}>{t('seen')}</div>
            </div>
            <div className={styles.wrapper}>
              {post &&
                listSeen?.map((value, index) => {
                  return <ItemRequest key={index} {...value} job={post.job} disabled></ItemRequest>
                })}
              {isLoadingSeen && <ContentLoader></ContentLoader>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Index
