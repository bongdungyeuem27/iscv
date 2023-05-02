import { useQuery } from '@apollo/client'
import styles from './styles.module.scss'
import {
  GetPostsByBusinessId,
  GetPostsIdByBusinessId,
  getPostsByBusinessId,
  getPostsIdByBusinessId,
} from '@graphql/Posts'
import { useParams } from 'react-router-dom'
import PagePost from '@components/PagePost'
import { GetEmployeeIdByUser, getEmployeeIdByUser } from '@graphql/Employee'
import { useSelector } from 'react-redux'
import { RootState } from '@redux/store'
import { ContentLoader } from '@components/ContentLoader'
// Page/Post/CenterSocial/index
function Main() {
  const params = useParams()
  const id = Number(params.id)
  const account = useSelector((state: RootState) => state.auth.account)
  const userQuery = useQuery<GetEmployeeIdByUser>(getEmployeeIdByUser, {
    variables: { user: account },
  })
  const { loading, data } = useQuery<GetPostsIdByBusinessId>(getPostsIdByBusinessId, {
    variables: { businessId: id },
  })

  return (
    <div className={styles.container}>
      {loading && <ContentLoader></ContentLoader>}
      {!loading &&
        data?.postsByBusinessId.map((value, index) => {
          return (
            <PagePost
              key={value.id + index}
              emplopyeeId={userQuery.data?.employeeByUser.id!}
              postId={value.id}
            ></PagePost>
          )
        })}
    </div>
  )
}

export default Main