import { useQuery } from '@apollo/client'
import { API_ENDPOINT_NODEJS, IPFS_GATEWAY } from '@constants/index'
import { useEmployee } from '@contracts/useEmployee'
import { useToast } from '@iscv/toast'
import { RootState } from '@redux/store'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { PostStatus } from 'src/types/posts'
import styles from './styles.module.scss'
import { useGetPostQuery } from '@graphql/generated/schema'
import Video from '@components/Video'
import { useLoading } from '@components/Loading'
import { setInterviewAppointment } from '@apis/employee/interview/appointment'
import { addItem } from '@redux/reducers/bot'
import { ERole } from 'src/types/messages'
import { EBotCategory } from '@redux/types/bot'

type Props = {
  postId: string
}
function PagePost(props: Props) {
  const { postId } = props
  const signer = useSelector((state: RootState) => state.auth.signer)
  const id = useSelector((state: RootState) => state.auth.employee)?.id
  const loading = useLoading()
  const { data, refetch } = useGetPostQuery({
    variables: { postId: String(postId), employeeId: id }
  })
  const dispatch = useDispatch()
  const { t } = useTranslation('component', { keyPrefix: 'postItem.index' })
  const toast = useToast()
  const employeeContract = useEmployee(signer!)
  const handleApply = async () => {
    loading.open()
    await employeeContract
      .applyPost(id!, data?.post?.businessId!, data?.post?._id!)
      .then(async (tx) => {
        await tx
          .wait()
          .then(async (apply) => {
            await setInterviewAppointment(id!, data?.post?._id!)
              .then(async (success) => {})
              .catch((error) => console.log(error))

            toast.success()

            refetch()
          })
          .catch((error) => {
            console.log(error)
          })
      })
      .catch((error) => {
        console.error(error)
        toast.error()
      })
    loading.close()
  }

  if (!data) return null
  return (
    <div className={clsx(styles.item)}>
      <div className={styles.head}>
        <div className={styles.personalWrapper}>
          <Link to={`/page/${data?.post?.businessId}`} className={styles.avatarWrapper}>
            <img src={`${IPFS_GATEWAY}${data?.post?.businessImage}`}></img>
          </Link>
          <div className={styles.avatarTextWrapper}>
            <Link to={`/page/${data?.post?.businessId}`} className={styles.name}>
              {data?.post?.businessName}
            </Link>
            <div className={styles.date}>{new Date().toLocaleString()}</div>
            {data?.post?.status && (
              <div
                className={clsx(
                  styles.container,
                  styles[PostStatus[data?.post?.status].toLowerCase()]
                )}
              >
                <a>{t(PostStatus[data?.post?.status!].toLowerCase())}</a>
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
        <a>{data?.post?.hashtag}</a>
      </div>
      <div className={styles.job}>
        <i className="fa-solid fa-tags"></i>
        <a>{data?.post?.job}</a>
      </div>
      <div className={styles.contentWrapper}>
        <p>{data?.post?.content}</p>

        <div className={styles.imageContent}>
          {data.post?.images?.at(0) && (
            <img
              src={`${API_ENDPOINT_NODEJS}public/business/post/${
                data.post?._id
              }/${data.post?.images?.at(0)}.jpeg`}
            ></img>
          )}
          {data.post?.videos?.at(0) && (
            <Video
              video={`${API_ENDPOINT_NODEJS}public/business/post/${
                data.post?._id
              }/${data.post?.videos?.at(0)}.mp4`}
            ></Video>
          )}
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
        {!data.post?.applied && PostStatus[data?.post?.status!] === 'OPEN' && (
          <button onClick={handleApply} className={styles.footItem}>
            <div className={styles.buttonApply}> {t('apply')}</div>
          </button>
        )}
        {data.post?.applied && PostStatus[data?.post?.status!] === 'OPEN' && (
          <button disabled={true} className={styles.footItem}>
            <div className={clsx(styles.buttonApply, styles.applied)}>{t('applied')}</div>
          </button>
        )}
        {PostStatus[data?.post?.status!] === 'CLOSE' && (
          <button disabled={true} className={styles.footItem}>
            <div className={clsx(styles.buttonApply, styles.applied)}>{t('closed')}</div>
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

export default PagePost
