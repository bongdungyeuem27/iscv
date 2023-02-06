import { getImage as getBusinessPostImage } from '@api/business/post'
import { getAvatar as getAvatarBusiness } from '@api/business/profile'
import { getAvatar as getAvatarEmployee } from '@api/employee/profile'
import avatarDefault from '@asset/avatar.png'
import { useLoading } from '@component/Loading'

import { useToast } from '@component/Toast'
import { Web3Context } from '@context/Web3ContextProvider'
import { getContract as getContractBusiness } from '@contract/businessController'
import { getContract as getContractEmployee } from '@contract/employeeController'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import PostStatus from './PostStatus'
import styles from './styles.module.scss'
import { Modal } from '@iscv/modal'
// Component/PostItem
function Item({
  content,
  time,
  businessPostId,
  job,
  hashTag,
  status,
  id,
  typeFor,
  disabled,
  imageSource,
  imageName,
}: any) {
  const [forceUpdate, setForceUpdate] = useState(false)
  const [avatar, setAvatar] = useState(avatarDefault)
  const [openClose, setOpenClose] = useState(false)
  const { loginState } = useContext(Web3Context)
  const [applied, setApplied] = useState(false)
  const { t } = useTranslation('component', { keyPrefix: 'postItem.index' })
  const toast = useToast()
  const [image, setImage] = useState()
  const loading = useLoading()
  const handleApplyPost = async () => {
    if (loginState.for != 'employee') {
      toast.warning('not employee', { pauseOnHover: true, closeOnClick: true })
      return
    }
    loading.open()

    loading.close()
  }
  const handleClosePost = async () => {
    if (loginState.for != 'business') {
      toast.warning('not business', { pauseOnHover: true, closeOnClick: true })
      return
    }
    loading.open()

    loading.close()
  }
  const [profile, setProfile] = useState()
  const checkApply = () => {}
  const checkAvatarBusiness = () => {
    getAvatarBusiness(id)
      .then((success) => {
        setAvatar(success)
      })
      .catch((error) => console.error(error))
  }
  const checkAvatarEmployee = () => {
    getAvatarEmployee(id)
      .then((success) => {
        setAvatar(success)
      })
      .catch((error) => console.error(error))
  }

  const getProfileBusiness = () => {}
  const loadImageBusiness = () => {
    if (!imageSource) return
    getBusinessPostImage(id, imageSource)
      .then((success) => setImage(success))
      .catch((error) => console.error(error))
  }
  useEffect(() => {
    if (loginState.for == 'employee') {
      checkApply()
    }
    if (typeFor == 'employee') {
      checkAvatarEmployee()
    }
    if (typeFor == 'business') {
      getProfileBusiness()
      checkAvatarBusiness()
      loadImageBusiness()
    }
  }, [])
  return (
    <>
      <Modal state={[openClose, setOpenClose]} title={t('confirm')} action={handleClosePost}>
        <div className={styles.closeModal}>{t('are_you_sure_to_close_this_post')}</div>
      </Modal>

      <div className={clsx(styles.item, { [styles.disabled]: disabled })}>
        <div className={styles.head}>
          <div className={styles.personalWrapper}>
            <Link to={`/page/${id}`} className={styles.avatarWrapper}>
              <img src={avatar}></img>
            </Link>
            <div className={styles.avatarTextWrapper}>
              <Link to={`/page/${id}`} className={styles.name}>
                {/* {profile?.name} */}
              </Link>
              {/* <div className={styles.date}>{new Date(parseInt(time * 1000)).toLocaleString()}</div> */}
              <PostStatus
                type={
                  (status == 1 && 'open') ||
                  (status == 2 && 'closed') ||
                  (status == 3 && 'upcoming')
                }
              ></PostStatus>
            </div>
          </div>
          <div className={styles.option}>
            <i className="fa-solid fa-ellipsis"></i>
          </div>
        </div>
        <div className={styles.hashtag}>
          <i className="fa-regular fa-hashtag"></i>
          <a>{hashTag}</a>
        </div>
        <div className={styles.job}>
          <i className="fa-solid fa-tags"></i>
          <a>{job}</a>
        </div>
        <div className={styles.contentWrapper}>
          <p>{content}</p>
          <Link
            to={
              typeFor == 'business'
                ? `/page/${id}/post/${businessPostId}`
                : `/profile/${id}/post/${businessPostId}`
            }
          >
            <img
              className={styles.imageContent}
              src={
                image ??
                ((typeof imageSource == 'object' && URL.createObjectURL(imageSource)) as any)
              }
            ></img>
          </Link>
        </div>
        <div className={styles.foot}>
          <div className={styles.footItem}>
            <i className="fa-regular fa-heart"></i>
            <div className={styles.footItemTitle}> {t('like')}</div>
          </div>
          <div className={styles.footItem}>
            <i className="fa-regular fa-comment"></i>
            <div className={styles.footItemTitle}> {t('comment')}</div>
          </div>
          <div className={styles.footItem}>
            <i className="fa-regular fa-bookmark"></i>
            <div className={styles.footItemTitle}> {t('bookmark')}</div>
          </div>
          <div className={styles.footItem}>
            <i className="fa-light fa-share-nodes"></i>
            <div className={styles.footItemTitle}> {t('share')}</div>
          </div>
          {!applied && loginState.for == 'employee' && parseInt(status) == 1 && (
            <button onClick={handleApplyPost} className={styles.footItem}>
              <div className={styles.buttonApply}> {t('apply')}</div>
            </button>
          )}
          {loginState.for == 'business' && id == loginState.id && parseInt(status) == 1 && (
            <button onClick={() => setOpenClose(true)} className={styles.footItem}>
              <div className={styles.buttonApply}> {t('close')}</div>
            </button>
          )}
          {parseInt(status) != 1 && (
            <button className={styles.footItem}>
              <div className={styles.buttonApply}> {t('closed')}</div>
            </button>
          )}
          {loginState.for == 'employee' && applied && (
            <button className={styles.footItem}>
              <div className={clsx(styles.buttonApply, styles.applied)}> {t('applied')}</div>
            </button>
          )}
        </div>
        {/* <div className={styles.commentWrapper}>
          <div className={styles.commentItem}>
            <img src={avatar} className={styles.commentIcon}></img>
            <div className={styles.commentInputWrapper}>
              <textarea
                onKeyDown={(e) => {
                  e.target.style.height = 'inherit'
                  e.target.style.height = `${e.target.scrollHeight}px`
                }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment.."
              ></textarea>
              <div className={styles.commentTool}>
                <i className={clsx(styles.commentSend, 'fa-solid fa-paper-plane-top')}></i>
              </div>
            </div>
          </div>
          <CommentItem key={0}></CommentItem>
        </div> */}
      </div>
    </>
  )
}

export default Item
