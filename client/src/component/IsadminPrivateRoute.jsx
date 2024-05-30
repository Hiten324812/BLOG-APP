import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'

export default function IsadminPrivateRoute() {

    const { currentUser } = useSelector(state => state.user )
  return (
       ( currentUser && currentUser.isadmin ? <Outlet /> : <Navigate to='/signin' /> ) 
  )
}
