import { ContentLoader } from '@components/ContentLoader'
import PagePost from '@components/PagePost'
import { useGetBusinessPostsQuery } from '@graphql/generated/schema'
import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styles from './styles.module.scss'
// Page/Post/CenterSocial/index
function Main() {
  const params = useParams()
  const id = Number(params.id)

  const query = useGetBusinessPostsQuery({ variables: { businessId: id! } })

  return (
    <div className={styles.container}>
      {query.loading && (
        <div className="w-full">
          <ContentLoader></ContentLoader>
        </div>
      )}
      {query.data?.posts?.map((value) => {
        return <PagePost postId={value?._id!} key={value?._id}></PagePost>
      })}
    </div>
  )
}

export default Main
