import React from 'react'
import HeaderCompany from '@component/HeaderCompany'
import { Outlet } from 'react-router-dom'

export default function LayoutHeaderCompany() {
  return (
    <>
      <HeaderCompany></HeaderCompany>
      <Outlet></Outlet>
    </>
  )
}
