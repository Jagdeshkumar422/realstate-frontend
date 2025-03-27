import React from 'react'
import "./notfound.css"
import { useNavigate } from 'react-router'

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className='not_found_main'>
      <div className="content_wrapper">
      <div className="content_notfound">
        <h1>404</h1>
        <div className='error_divider'></div>
        <p>This page cannot be found</p>
      </div>
      <button onClick={()=>{navigate(-1)}} className='rb_btn'>Go Back?</button>
      </div>
    </div>
  )
}

export default NotFound