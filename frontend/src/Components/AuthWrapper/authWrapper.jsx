import React from 'react'
import {Navigate } from 'react-router-dom'

function AuthWrapper({children}) {
 const token = localStorage.getItem('token')

    if(!token){
   return <Navigate to='/login' replace={true} />
}
  return (
  <div>
  {children}
  </div>

  )
}

export default AuthWrapper