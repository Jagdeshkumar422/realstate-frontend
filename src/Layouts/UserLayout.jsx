import React from 'react'
import { Outlet } from 'react-router';
import NavBar from '../Components/Navbar/NavBar';

function Layout (){
  return (
    <main className='main_container'>
      <NavBar />
      <Outlet />
    </main>
  )
}

export default Layout
