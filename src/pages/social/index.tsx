import { useQuery } from '@apollo/client'
import PagePost from '@components/PagePost'

import { RootState } from '@redux/store'
import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import { Exact, useGetPredictQuery } from '@graphql/generated/schema'
import { ContentLoader } from '@components/ContentLoader'
import { useEffect, useRef } from 'react'

type Props = {}

const Social = (props: Props) => {
  const divRef = useRef<any>(null)
  const id = useSelector((state: RootState) => state.auth.employee)?.id
  const query = useGetPredictQuery({ variables: { employeeId: id! } })
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    const scrollPercentage = (scrollTop + clientHeight) / scrollHeight

    if (scrollPercentage >= 0.75) {
      // Gọi hàm hoặc xử lý khi màn hình được cuộn tới 3/4
      // console.log('Màn hình đã được cuộn tới 3/4')
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className={styles.container} ref={divRef}>
      {query.loading && (
        <div className="w-full">
          <ContentLoader></ContentLoader>
        </div>
      )}
      {query.data?.prediction?.map((value) => {
        return <PagePost postId={value?._id!} key={value?._id}></PagePost>
      })}
    </div>
  )
}

export default Social
