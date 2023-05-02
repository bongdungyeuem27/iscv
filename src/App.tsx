import { useQuery } from '@apollo/client'
import { LoadingContainer } from '@components/Loading'
import { getEmployeeByUser } from '@graphql/Employee'
import { ToastContainer } from '@iscv/toast'

import { connect } from '@redux/reducers/auth'
import { RootState } from '@redux/store'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function App() {
  const provider: ethers.providers.Web3Provider = useSelector(
    (state: RootState) => state.auth.provider
  )
  const account = useSelector((state: RootState) => state.auth.account)
  const dispatch = useDispatch()
  const { loading, error, data, refetch, subscribeToMore, client } = useQuery(getEmployeeByUser, {
    variables: { user: account },
    notifyOnNetworkStatusChange: true,
  })

  useEffect(() => {
    ;(provider.provider as any).on('accountsChanged', async () => {
      await dispatch<any>(connect({ provider }))
      refetch()
    })
    ;(provider.provider as any).on('chainChanged', async () => {
      await dispatch<any>(connect({ provider }))
      refetch()
    })
    return () => {
      ;(provider.provider as any).removeListener('accountsChanged', () => {})
      ;(provider.provider as any).removeListener('chainChanged', () => {})
    }
  }, [])
  useEffect(() => {
    ;(async () => {
      await dispatch<any>(connect({ provider }))
    })()
  }, [])
  return (
    <div className="App">
      <LoadingContainer></LoadingContainer>
      <ToastContainer></ToastContainer>
      <Outlet></Outlet>
    </div>
  )
}

export default App
