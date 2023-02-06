import React from 'react'
import Header from '@component/Header'
import { Outlet } from 'react-router-dom'
import Footer from '@component/Footer'
import { MorePanel } from '@component/MorePanel'
export default function LayoutHeader() {
  return (
    <>
      <Header></Header>

      <Outlet></Outlet>
    </>
  )
}
