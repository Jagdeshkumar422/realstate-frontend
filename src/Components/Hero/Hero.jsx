import React, { useEffect, useState } from "react";
import { Element, Link } from "react-scroll";
import "./hero.css";
import first from "../../Assets/images/mithi.jpg";
import second from "../../Assets/images/mithi 1.jpg";
import third from "../../Assets/images/mithi.jpg";
import axios from "axios";
import { APP_CONFIG } from "../../config";
import DahsboardLoader from "../DahsboardLoader/DahsboardLoader";

const Hero = () => {
  localStorage.setItem("testing","testing use effect")
  const [activeIndex, setActiveIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${APP_CONFIG.backendUrl}api/slider-images`);
      if (response.data.length > 0) {
        const imageUrls = response.data.map(image => image.image.url);
        setImages(imageUrls);
      } else {
        setImages([first, second, third]);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      setImages([first, second, third]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleKeyDown = (e, elementId) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  if (loading) {
    return <DahsboardLoader />;
  }

  return (
    <Element name="hero" className="hero_parent">
      <section id="hero">
        <div className="hero_text_area">
          <h1>Trusted Guidance for Your Real Estate Journey</h1>
          <p>
            Elevate your lifestyle with our exceptional offerings for your dream home
          </p>
          <Link
            className="button"
            to="L_services"
            spy={true}
            smooth={true}
            offset={0}
            duration={500}
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, "L_services")}
            href="#"
          >
            Explore more
          </Link>
        </div>
        <div className="carousel">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={index}
              style={{zIndex: index === 2 && activeIndex === 1 ? -1 : null}}
              className={`img ${activeIndex === index ? "active" : ""}`}
            />
          ))}
        </div>
      </section>
    </Element>
  );
};

export default Hero;
