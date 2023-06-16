import Bot from '@components/Bot'
import { LoadingContainer } from '@components/Loading'
import { useGetEmployeeByUserQuery } from '@graphql/generated/schema'
import { ToastContainer } from '@iscv/toast'
import { connect } from '@redux/reducers/auth'
import { addItem } from '@redux/reducers/messages'
import { setClient } from '@redux/reducers/socket'
import { RootState } from '@redux/store'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { crawlBotMessages } from '@redux/reducers/bot'

function App() {
  const provider = useSelector((state: RootState) => state.auth.provider)
  const account = useSelector((state: RootState) => state.auth.account)
  const employee = useSelector((state: RootState) => state.auth.employee)
  const dispatch = useDispatch()
  const client = useSelector((state: RootState) => state.socket.client)
  const { loading, error, data, refetch, subscribeToMore } = useGetEmployeeByUserQuery({
    variables: { user: account }
  })

  useEffect(() => {
    if (!provider) return
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
  }, [provider])
  useEffect(() => {
    ;(async () => {
      if (!provider) return
      await dispatch<any>(connect({ provider }))
    })()
  }, [provider])

  useEffect(() => {
    ;(async () => {
      if (data?.employeeByUser?.id === undefined || data?.employeeByUser?.id === null) return
      await dispatch<any>(setClient({ employeeId: data?.employeeByUser?.id }))
    })()
  }, [data?.employeeByUser?.id])

  useEffect(() => {
    // if (client?.id === undefined) return
    console.log(client?.id)
    client?.on('send', (args) => {
      console.log(args)
      dispatch<any>(addItem(args as any))
    })
  }, [client?.id])
  useEffect(() => {
    if (!employee) return
    dispatch<any>(crawlBotMessages({ employeeId: employee.id }))
  }, [employee])
  return (
    <div className="App">
      <LoadingContainer></LoadingContainer>
      <ToastContainer></ToastContainer>
      <Bot></Bot>
      <Outlet></Outlet>
    </div>
  )
}

export default App
