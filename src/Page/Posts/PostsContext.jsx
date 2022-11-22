import { createContext, useState, useEffect } from 'react'
import { getContract as getContractBusiness } from '@contract/businessController'
import { useLocation, useParams } from 'react-router-dom'
export const PostsContext = createContext()

const PostsContextProvider = ({ children }) => {
  const id = useParams().id
  const location = useLocation()
  const [profile, setProfile] = useState()
  useEffect(() => {
    if (location.pathname.includes('page')) {
      getContractBusiness()
        .then((contractBusiness) => {
          contractBusiness.methods
            .getProfile(id)
            .call()
            .then((success) => setProfile(success))
            .catch((error) => console.error(error))
        })
        .catch((error) => console.error(error))
    }
  }, [id])
  const data = { profile, setProfile }
  return <PostsContext.Provider value={data}>{children}</PostsContext.Provider>
}

export default PostsContextProvider
