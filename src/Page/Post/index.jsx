import React, { useState, useEffect, useContext, useCallback } from 'react'
import styles from './styles.module.scss'
import CommentItem from '@component/CommentItem'
import avatarDefault from '@asset/avatar.png'
import { useLocation, useParams } from 'react-router-dom'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract as getContractBusiness } from '@contract/businessController'
import { getContract as getContractEmployee } from '@contract/employeeController'
import * as businessProfileApi from '@api/business/profile'
import { STATUS } from '@constant/postConst'
import { useLoading } from '@component/Loading'
import { useToast } from '@component/Toast'
import clsx from 'clsx'
import { getImage as getBusinessPostImage } from '@api/business//post'
import { useTranslation } from 'react-i18next'

function Index() {
  const { loginState } = useContext(Web3Context)
  const [profile, setProfile] = useState()
  const [applied, setApplied] = useState(false)
  const [comment, setComment] = useState()
  const [avatar, setAvatar] = useState()
  const loading = useLoading()
  const toast = useToast()
  const location = useLocation()
  const params = useParams()
  const postId = params.postid
  const id = params.id
  const [post, setPost] = useState()
  const { t } = useTranslation('page', { keyPrefix: 'post.index' })
  const checkApply = useCallback(() => {
    getContractEmployee().then((employeeContract) => {
      employeeContract.methods
        ._checkExistApply(loginState.id, postId)
        .call({ from: loginState.address })
        .then(async (check) => {
          if (check) {
            setApplied(true)
            return
          }
        })
        .catch((error) => console.log(error))
    })
  }, [])
  const loadBusinessProfile = useCallback(() => {
    getContractBusiness()
      .then((contractBusiness) => {
        contractBusiness.methods
          .getProfile(id)
          .call()
          .then((success) => setProfile({ ...success }))
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])
  const loadBusinessPost = useCallback(() => {
    getContractBusiness()
      .then((contractBusiness) => {
        contractBusiness.methods
          .getPost(postId)
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
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }, [])
  const loadAvatar = useCallback(() => {
    businessProfileApi
      .getAvatar(id)
      .then((success) => setAvatar(success))
      .catch((error) => console.error(error))
  }, [])
  const handleApplyPost = async () => {
    if (loginState.for != 'employee') {
      toast.warning('not employee', { pauseOnHover: true, closeOnClick: true })
      return
    }
    loading.open()
    await getContractEmployee()
      .then(async (contractEmployee) => {
        await contractEmployee.methods
          ._checkExistApply(loginState.id, postId)
          .call({ from: loginState.address })
          .then(async (check) => {
            if (check) {
              toast.warning('had applied', { pauseOnHover: true, closeOnClick: true })
              return
            }
            await contractEmployee.methods
              .applyPost(loginState.id, id, postId)
              .send({ from: loginState.address })
              .then((success) => {
                toast.success('success', { pauseOnHover: true, closeOnClick: true })
                setApplied(true)
              })
              .catch((error) => console.log(error))
          })
          .catch((error) => console.log(error))
      })
      .catch((error) => console.log(error))

    loading.close()
  }
  useEffect(() => {
    if (location.pathname.includes('page')) {
      loadBusinessPost()
      loadBusinessProfile()
      loadAvatar()
      if (loginState.for == 'employee') {
        checkApply()
      }
    }
  }, [])
  return (
    <section className={styles.container}>
      <div className={styles.photo}>
        <img src={post?.image}></img>
      </div>
      <div className={styles.comment}>
        <div className={styles.top}>
          <div className={styles.avatar}>
            <img src={avatar || avatarDefault}></img>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.title}>{profile?.name}</div>
            <div className={styles.time}>
              {new Date(parseInt(post?.time * 1000)).toLocaleString()}
            </div>
          </div>
        </div>
        <div className={styles.moreInfoRecruit}>
          <div className={styles.hashtag}>
            <i className="fa-regular fa-hashtag"></i>
            <a>{post?.hashTag}</a>
          </div>
          <div className={styles.job}>
            <i className="fa-solid fa-tags"></i>
            <a>{post?.job}</a>
          </div>
        </div>
        <div className={styles.content}>
          <p>{post?.content}</p>
        </div>
        <div className={styles.tool}>
          <div className={styles.item}>
            <i className="fa-regular fa-heart"></i>
            <div className={styles.title}>25 {t("like")}</div>
          </div>
          <div className={styles.item}>
            <i className="fa-regular fa-bookmark"></i>
            <div className={styles.title}>{t("bookmark")}</div>
          </div>
          <div className={styles.item}>
            <i className="fa-regular fa-share-nodes"></i>
            <div className={styles.title}>{t("share")}</div>
          </div>
          {!applied && loginState.for == 'employee' && parseInt(post?.status) == STATUS.OPEN && (
            <button onClick={handleApplyPost} className={styles.footItem}>
              <div className={styles.buttonApply}>{t("apply")}</div>
            </button>
          )}
          {loginState.for == 'business' &&
            id == loginState.id &&
            parseInt(post?.status) == STATUS.OPEN && (
              <button onClick={() => setOpenClose(true)} className={styles.footItem}>
                <div className={styles.buttonApply}>{t("close")}</div>
              </button>
            )}
          {parseInt(post?.status) == STATUS.CLOSE && (
            <button className={styles.footItem}>
              <div className={styles.buttonApply}>{t("closed")}</div>
            </button>
          )}
          {loginState.for == 'employee' && applied && (
            <button className={styles.footItem}>
              <div className={clsx(styles.buttonApply, styles.applied)}>{t("applied")}</div>
            </button>
          )}
        </div>
        <div className={styles.group}>
          <CommentItem></CommentItem>
        </div>
        <div className={styles.input}>
          <div className={styles.avatar}>
            <img src={avatarDefault}></img>
          </div>
          <div className={styles.wrapper}>
            <textarea
              onChange={(e) => {
                e.target.style.height = 'inherit'
                e.target.style.height = `${e.target.scrollHeight}px`
                setComment(e.target.value)
              }}
              rows={1}
              value={comment}
              placeholder="Write your comment.."
            ></textarea>
            <div className={styles.send}>
              <i className={'fa-solid fa-paper-plane-top'}></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Index
