import { Element } from "react-scroll";
import "./landingproperties.css";
import React, { useState, useRef, useEffect } from "react";
import Left from "../../icons/iconLeft";
import Right from "../../icons/iconRight";
import axios from "axios";
import demo from "../../Assets/images/estate-hero.jpg"
import { useNavigate } from "react-router";
import { APP_CONFIG } from "../../config";

const LandingProperties = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getLatest = async () => {
      setShowLoader(true)
      try {
        const response = await axios.get(
          `${APP_CONFIG.backendUrl}api/allProp/latest`
        );
        setTimeout(() => {
          setData(response.data);
          setShowLoader(false)
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };
    getLatest();
  }, []);

  const prevSlide = () => {
    carouselRef.current.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const nextSlide = () => {
    carouselRef.current.scrollTo({
      left: carouselRef.current.scrollWidth,
      behavior: "smooth",
    });
  };

  return (
    <Element name="L_properties" className="L_properties">
      <section id="L_properties">
        <div className="carousel_header">
          <h1>Our Latest</h1>
          <div className="navigation_container">
            <button onClick={prevSlide} className="button lefty" aria-labelledby="leftybtn" name="left btn">
              <Left />
            </button>
            <button onClick={nextSlide} className="button righty" aria-labelledby="rightybtn" name="right btn">
              <Right />
            </button>
          </div>
        </div>
        <div className="carousel-wrap">
          <div className="carousel-container">
            <div className="carousel" ref={carouselRef}>
              {showLoader ? (
                <div className="loader-container">
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
                </div>
              ) : (
                <>
                  {data?.map((item) => {
                    return (<>
                      <div key={item._id} className={`carousel-slide`} onClick={()=>{navigate(`/property/${item?.property_type}/${item._id}`)}}>
                        <div className="card_image">
                          <img src={item?.image[0]?.url||demo} alt="lol" />
                        </div>
                        <div className="card_content">
                          <h3>{item.name}</h3>
                          <h3>{item.property_type!=="OffPlan"&&item.size +" "+ "sqft"} </h3>
                          <p>{item.address}</p>
                        </div>
                      </div>
                    </>);
                  })}
                </>
              )}
              {!showLoader ? (
                <div className="ex_properties">
                  <button className="rb_btn" onClick={()=>{navigate("/buy")}}>Explore more</button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default LandingProperties;
