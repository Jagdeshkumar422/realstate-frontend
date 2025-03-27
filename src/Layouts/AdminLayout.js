import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Sidebar/SideBar'
import "react-toastify/dist/ReactToastify.css";


const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  return (
    <>
    <div className='adminlayoutparent' >
      <div className="trigger_icn" onClick={()=>{setOpen(!open)}}>
      {open ? (
            <i className="fa-solid fa-xmark" style={{color: open ? "white" : null}}></i>
          ) : (
            <i className="fa-solid fa-bars"></i>
          )}
      </div>
    <SideBar trigger={open}/>
    <Outlet/>
    </div>
    </>
  )
}

export default AdminLayout