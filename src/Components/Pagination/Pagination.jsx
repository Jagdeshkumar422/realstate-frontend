import React from 'react'
import { useLocation } from 'react-router'

const Pagination = ({handleFirstPage,currentPage,handlePrevPage,totalPages,handleNextPage,startCardIndex,endCardIndex,datalength}) => {
 const location = useLocation()
  return (
    <div className="prprt_crds_navigation" style={{marginInline: location.pathname.includes("offplanpage") ? "30px" : ""}}>
    <button
      className="first_page rb_btn"
      onClick={handleFirstPage}
      disabled={currentPage === 0}
    >
      1st Page
    </button>
    <button
      className="prev_prprt rb_btn"
      onClick={handlePrevPage}
      disabled={currentPage === 0}
    >
      Prev
    </button>
    <p className="page_info">
      {currentPage + 1} of {totalPages}
    </p>
    <button
      className="next_prprt rb_btn"
      onClick={handleNextPage}
      disabled={currentPage === totalPages - 1}
    >
      Next
    </button>
    <p className="left_info">
      {startCardIndex - 1} - {endCardIndex} / {datalength||0} cards
    </p>
  </div>
  )
}

export default Pagination