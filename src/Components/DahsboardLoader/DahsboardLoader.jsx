import React from 'react'
import "./dashboardLoader.css"

const DahsboardLoader = () => {
  return (
    <div className='dashboard-loader-container'>
    <div className="loader-container">
    <div className="cube">
      <div className="face front"></div>
      <div className="face back"></div>
      <div className="face right"></div>
      <div className="face left"></div>
      <div className="face top"></div>
      <div className="face bottom"></div>
    </div>
    <p className="first_loading_p">Processing request...</p>
    <p>Please wait</p>
  </div>
  </div>
  )
}

export default DahsboardLoader