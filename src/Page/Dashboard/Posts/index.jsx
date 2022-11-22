import React from 'react'
import styles from './styles.module.scss'
import Middle from './Middle'
import { useSearchParams } from 'react-router-dom'
import ViewPost from './ViewPost'
import CreatePost from './CreatePost'
function Index() {
  const [searchParams] = useSearchParams()
  return (
    <div className={styles.container}>
      {(() => {
        if (searchParams.get('businessPostId')) {
          return <ViewPost></ViewPost>
        } else if (searchParams.get('create')) return <CreatePost></CreatePost>
        else return <Middle></Middle>
      })()}
    </div>
  )
}

export default Index
