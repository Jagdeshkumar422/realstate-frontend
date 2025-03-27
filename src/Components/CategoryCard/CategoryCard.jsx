import React from 'react';
import './categoryCard.css';
import demo from '../../Assets/images/estate-hero.jpg';
import { useLocation, useNavigate } from 'react-router';
import { priceConverter } from '../../Utils/currencyUtils';

const CategoryCard = ({
  location,
  price,
  name,
  id,
  image,
  type,
  bedroom,
  bathroom,
  size,
}) => {
  const navigate = useNavigate();
  const loc = useLocation();

  const handleNav = () => {
    navigate(`/property/${type}/${id}`);
  };

  const truncateName = (name) => {
    return name.length > 20 ? name.slice(0, 20) + '...' : name;
  };

  return (
    <div
      className="cat_card_container"
      onClick={handleNav}
    >
      <img
        src={image?.url ? image.url : demo}
        onError={(e) => {
          e.target.src = demo;
        }}
        alt="pic for property"
      />

      <section className="primary_info_section">
        <p>{truncateName(name)}</p>
        <p className="price">
          {priceConverter(price)} <span>PKR</span>
        </p>
      </section>

      <section className="secondary_info_section">
        <div className="bedrooms">
          <i className="fa-solid fa-bed"></i>
          {bedroom === 0 ? 'Studio' : <p>{bedroom} Bedrooms</p>}
        </div>
        <div className="bath">
          <i className="fa-solid fa-bath"></i>
          <p>{bathroom} Bath</p>
        </div>
        <div className="space">
          <i className="fa-solid fa-house"></i>
          <p>
            {size} <span> sqft</span>
          </p>
        </div>
      </section>

      <section className="secondary_info_section">
        <div className="location">
          <i className="fa-sharp fa-solid fa-location-dot"></i>
          <p>{location}</p>
        </div>
      </section>
    </div>
  );
};

export default CategoryCard;
