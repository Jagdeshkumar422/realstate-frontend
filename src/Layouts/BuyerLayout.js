import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import BuyerSidebar from '../Components/buyerDashboard/BayerSideBar/BayerSideBar';


const BuyerLayout = () => {
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
    <BuyerSidebar trigger={open}/>
    <Outlet/>
    </div>
    </>
  )
}

export default BuyerLayout