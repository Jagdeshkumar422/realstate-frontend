import React, { useEffect, useRef, useState } from "react";
import "../category.css";
import CategoryCard from "../../../Components/CategoryCard/CategoryCard";
import axios from "axios";
import Pagination from "../../../Components/Pagination/Pagination";
import SearchBar from "../../../Components/SearchBar/SearchBar";
import { APP_CONFIG } from './../../../config';

const RentPage = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);
  const cardRef = useRef();
  const [cardData, setCardData] = useState(1);
  const cardsPerPage = 20;
  const totalPages = Math.ceil(data?.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const [filter, setFilter] = useState({
    property_type: "all",
    minPrice: "",
    maxPrice: "",
    bedrooms:"",
    minSize: "",
    maxSize: "",
    furnished: "",
  });
  const startIndex = currentPage * cardsPerPage;
  const endIndex = Math.min(startIndex + cardsPerPage, data?.length);
  const startCardIndex = startIndex + 1;
  const endCardIndex = Math.min(endIndex, data?.length);

  useEffect(() => {
    const getRentData = async () => {
      try {
        setLoading(true)
        await axios
          .get(`${APP_CONFIG.backendUrl}api/rent`, {
            params: { filter },
          })
          .then((res) => {setData(res.data);setLoading(false)});
      } catch (error) {
        setLoading(false)
        console.log(error);
      }
    };
    getRentData();
  }, [filter]);
  const handleNextPage = () => {
    cardRef.current.style.opacity = 0;
    setTimeout(() => {
      setCardData(cardData - 1);
      cardRef.current.style.opacity = 1;
      setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
    }, 300);
  };

  const handlePrevPage = () => {
    cardRef.current.style.opacity = 0;
    setTimeout(() => {
      setCardData(cardData + 1);
      cardRef.current.style.opacity = 1;
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    }, 300);
  };

  const handleFirstPage = () => {
    cardRef.current.style.opacity = 0;
    setTimeout(() => {
      setCardData(cardData + 1);
      cardRef.current.style.opacity = 1;
      setCurrentPage(0);
    }, 300);
  };


  return (
    <>
      <SearchBar filter={filter} setFilter={setFilter} />
      <div
        className="properties_content"
        ref={cardRef}
        style={{ transition: "opacity 1s linear" }}
      >
        {data.length>0&&!loading ? (
          data
            ?.slice(startIndex, endIndex)
            .map((card, index) => (
              <CategoryCard
                location={card.location}
                name={card.name}
                price={card.price}
                key={index}
                bedroom={card.bedrooms}
                bathroom={card.bathrooms}
                size={card.size}
                id={card._id}
                type={card.property_type}
                image={card.image[0]}
              />
            ))
        ) :<div className="loader-container">
        {data.length===0&&!loading?<div style={{fontSize:"20px"}}>No properties found</div>:<>
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
        <p className="first_loading_p">Loading...</p>
        <p>Please wait</p>
        </> } </div>}
        <div className="divider_spacer"></div>
      </div>
      <Pagination
        handleFirstPage={handleFirstPage}
        currentPage={currentPage}
        handlePrevPage={handlePrevPage}
        totalPages={totalPages}
        handleNextPage={handleNextPage}
        startCardIndex={startCardIndex}
        endCardIndex={endCardIndex}
        datalength={data.length}
      />
    </>
  );
};

export default RentPage;
