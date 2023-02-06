import { LoadingContainer } from '@component/Loading'
import { MorePanel } from '@component/MorePanel'
import { ToastContainer } from '@component/Toast'
import LayoutHeader from '@layout/LayoutHeader'
import PageLayout from '@layout/PageLayout'
import AboutProfile from '@page/About'
import Dashboard from '@page/Dashboard'
import Feed from '@page/Feed'
import Instruction from '@page/Instruction'
import InterView from '@page/Interview'
import Messages from '@page/Messages'
import Mycv from '@page/Mycv'
import Post from '@page/Post'
import PostsProfile from '@page/Posts'
import Setting from '@page/Setting'
import Test from '@page/Test'
import { RootState } from '@redux/store'
import { ethers } from 'ethers'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import LayoutSocial from './Layout/LayoutSocial'
import ProfileLayout from './Layout/ProfileLayout'
import CustomCV from './Page/CustomCV'
import Home from './Page/Home'
import Login from './Page/Login'
import Register from './Page/Register'
import { useEffect } from 'react'
import { connect } from '@redux/reducers/auth'
import { getEmployeeByUser } from '@graphql/Employee'
import { useQuery } from '@apollo/client'
import ContractMiddleware from '@middleware/ContractMiddleware'

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
  return (
    <div className="App">
      <LoadingContainer></LoadingContainer>
      <ToastContainer></ToastContainer>
      <MorePanel></MorePanel>
      <Routes>
        <Route path="">
          <Route path="">
            <Route path="" element={<ContractMiddleware></ContractMiddleware>}>
              <Route path="" element={<LayoutHeader></LayoutHeader>}>
                <Route path="" element={<Home />}></Route>

                <Route path="page/:id">
                  <Route path="" element={<PageLayout></PageLayout>}>
                    <Route path="about" element={<AboutProfile />}></Route>

                    <Route path="" element={<PostsProfile />}></Route>
                  </Route>
                  <Route path="interview" element={<InterView />}></Route>
                  <Route path="post/:postid" element={<Post></Post>}></Route>
                </Route>
                <Route path="profile/:id">
                  <Route path="" element={<ProfileLayout></ProfileLayout>}>
                    <Route path="mycv" element={<Mycv />} />
                    <Route path="about" element={<AboutProfile />}></Route>
                    <Route path="" element={<PostsProfile />}></Route>
                  </Route>
                  <Route path="post/:postid" element={<Post></Post>}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="" element={<ContractMiddleware requestAddress> </ContractMiddleware>}>
              <Route path="" element={<LayoutHeader></LayoutHeader>}></Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="" element={<ContractMiddleware isBusiness></ContractMiddleware>}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
            <Route path="" element={<ContractMiddleware requestLogin></ContractMiddleware>}>
              <Route path="" element={<LayoutHeader></LayoutHeader>}>
                <Route path="social" element={<LayoutSocial></LayoutSocial>}>
                  <Route path="" element={<Feed />}></Route>
                </Route>
                <Route path="setting" element={<Setting></Setting>}></Route>
                <Route path="messages" element={<Messages></Messages>}>
                  <Route path="page/:id" element={<Messages></Messages>}></Route>
                  <Route path="profile/:id" element={<Messages></Messages>}></Route>
                </Route>
              </Route>
              <Route path="">
                <Route path="customcv" element={<CustomCV />} />
              </Route>
            </Route>
            <Route path="" element={<LayoutHeader></LayoutHeader>}></Route>

            <Route path="test" element={<Test />} />
            <Route path="instruction" element={<Instruction />} />
          </Route>
        </Route>
        <Route path="404" element={<div>Not found</div>}></Route>
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
