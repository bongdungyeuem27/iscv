import { useGetBusinessLazyQuery } from '@graphql/generated/schema'
import { newRecent } from '@redux/reducers/messages'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams, useSearchParams } from 'react-router-dom'

type IContext = {
  searchShow?: boolean
  setSearchShow?: Dispatch<SetStateAction<boolean>>
}
export const ChatContext = createContext<IContext>({})

type Props = {
  children?: React.ReactNode
}

const ChatContextProvider = ({ children }: Props) => {
  const [searchShow, setSearchShow] = useState(false)
  const [searchParams] = useSearchParams()
  const businessId = parseInt(searchParams.get('business_id') || '-1')
  const dispatch = useDispatch()
  useEffect(() => {
    if (businessId === -1) return

    dispatch<any>(newRecent({ businessId, updatedAt: new Date() }))
  }, [businessId])
  const data = {
    searchShow,
    setSearchShow
  }
  return <ChatContext.Provider value={data}>{children}</ChatContext.Provider>
}

export default ChatContextProvider
