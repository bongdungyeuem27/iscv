import React, { useState, useEffect, useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Page/Home'
import LayoutSocial from './Layout/LayoutSocial'
import PostsProfile from '@page/Posts'
import AboutProfile from '@page/About'
import Login from './Page/Login'
import Register from './Page/Register'
import ProfileLayout from './Layout/ProfileLayout'
import Dashboard from '@page/Dashboard'
import ContractMiddleware from '@/Middleware/ContractMiddleware'
import Test from '@page/Test'
import LayoutHeader from '@layout/LayoutHeader'
import { MorePanel } from '@component/MorePanel'
import { ToastContainer } from '@component/Toast'
import CustomCV from './Page/CustomCV'
import Feed from '@page/Feed'
import { LoadingContainer } from '@component/Loading'
import Setting from '@page/Setting'
import Post from '@page/Post'
import Messages from '@page/Messages'
import PageLayout from '@layout/PageLayout'
import Mycv from '@page/Mycv'
import Instruction from '@page/Instruction'
import InterView from "@page/Interview"

function App() {
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
        <Route path="*" element={<div>404 Page Not Found</div>} />
      </Routes>
    </div>
  )
}

export default App
