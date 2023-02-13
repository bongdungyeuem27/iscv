import styles from './styles.module.scss'
// Page/Post/CenterSocial/index
function Index() {
  return (
    <div className={styles.container}>
      {/* {id == loginState.id && location.pathname.includes('profile') && <StatusPanel></StatusPanel>} */}

      {/* {info &&
        list &&
        list?.map((value, index) => {
          return (
            <PostItem
              key={index}
              id={id}
              {...value}
              typeFor={location.pathname.includes('profile') ? 'employee' : 'business'}
            ></PostItem>
          )
        })} */}
      {/* {isLoading && <ContentLoader></ContentLoader>} */}
    </div>
  )
}

export default Index
