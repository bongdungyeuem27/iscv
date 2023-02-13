import { useQuery } from '@apollo/client'
import { IPFS_GATEWAY } from '@constants/index'
import { GetImageNameById, getImageNameById } from '@graphql/Business'
import { GetPost, getPost } from '@graphql/Posts'
import { useToast } from '@iscv/toast'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PostStatus } from 'src/types/posts'
import styles from './styles.module.scss'
import { useEmployee } from '@contracts/useEmployee'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'

type Props = {
  emplopyeeId: number
  postId: number
}
function ReviewPost(props: Props) {
  const { emplopyeeId, postId } = props
  const signer = useSelector((state: RootState) => state.auth.signer)
  const { loading, data, refetch } = useQuery<GetPost>(getPost, { variables: { postId: postId } })
  const imageNameQuery = useQuery<GetImageNameById>(getImageNameById, {
    variables: { id: data?.post.businessId },
  })
  const { t } = useTranslation('component', { keyPrefix: 'postItem.index' })
  const toast = useToast()
  const employeeContract = useEmployee(signer!)
  const handleApply = async () => {
    try {
      ;(await employeeContract)
        .applyPost(emplopyeeId, data?.post?.businessId!, data?.post.id!)
        .then((success) => {
          toast.success()
          refetch()
        })
    } catch (error) {
      console.error(error)
      toast.error()
    }
  }
  return (
    <div className={clsx(styles.item)}>
      <div className={styles.head}>
        <div className={styles.personalWrapper}>
          <Link to={`/page/${data?.post.businessId}`} className={styles.avatarWrapper}>
            <img src={`${IPFS_GATEWAY}${imageNameQuery.data?.business.sourceImage}`}></img>
          </Link>
          <div className={styles.avatarTextWrapper}>
            <Link to={`/page/${data?.post.businessId}`} className={styles.name}>
              {imageNameQuery.data?.business.name}
            </Link>
            <div className={styles.date}>{new Date().toLocaleString()}</div>
            {data?.post.status && (
              <div
                className={clsx(
                  styles.container,
                  styles[PostStatus[data?.post.status].toLowerCase()]
                )}
              >
                <a>{t(PostStatus[data?.post.status!].toLowerCase())}</a>
              </div>
            )}
          </div>
        </div>
        <div className={styles.option}>
          <i className="fa-solid fa-ellipsis"></i>
        </div>
      </div>
      <div className={styles.hashtag}>
        <i className="fa-regular fa-hashtag"></i>
        <a>{data?.post.hashtag}</a>
      </div>
      <div className={styles.job}>
        <i className="fa-solid fa-tags"></i>
        <a>{data?.post.job}</a>
      </div>
      <div className={styles.contentWrapper}>
        <p>{data?.post.content}</p>

        <div className={styles.imageContent}>
          {data?.post.imageSource && (
            <img src={`${IPFS_GATEWAY}${data.post.imageSource}`} alt="post"></img>
          )}
          {!data?.post.imageSource && <i className={clsx('fa-duotone fa-image')}></i>}
        </div>
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
        {data?.post.status && PostStatus[data?.post.status] === 'OPEN' && (
          <button onClick={handleApply} className={styles.footItem}>
            <div className={styles.buttonApply}> {t('apply')}</div>
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
  )
}

export default ReviewPost
