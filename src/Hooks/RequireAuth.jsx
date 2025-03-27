import React from 'react'
import {Navigate,Outlet,useLocation} from "react-router-dom"
import { token } from './UserHooks'


const RequireAuth = () => {
   let location=useLocation()
  return (
token?<Outlet/>:<Navigate to={"/login" } state={{from:location}} replace/>
   
  )
}

export default RequireAuth