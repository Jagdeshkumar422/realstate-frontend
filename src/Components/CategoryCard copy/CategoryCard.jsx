import React, { useEffect } from 'react';
import './categoryCard.css';
import demo from '../../Assets/estate-hero.jpg';
import { useLocation, useNavigate } from 'react-router';
import { priceConverter } from '../../Utils/currencyUtils';

const CategoryCard = ({
  location,
  price1,
  price2,
  name,
  index,
  id,
  image,
  type,
  bedroom,
  bathroom,
  price,
  size,
  key,
  edit,
}) => {
  const navigate = useNavigate();
  const loc = useLocation();

  const handleNav = () => {
    if (loc.pathname === '/offplanpage' || loc.pathname.includes('/offplan')) {
      if (loc.pathname.includes('/offplan')) {
        // If we're already on the offplan page, just scroll to top
        window.scrollTo(0, 0);
        navigate(`/offplan/${id}`);
      } else {
        navigate(`/offplan/${id}`);
      }
    } else if (loc.pathname.includes('/dashboard')) {
    } else {
      navigate(`/property/${type}/${id}`);
    }
  };

  return (
    <div
      className={
        loc.pathname === '/offplanpage' ||
        loc.pathname === '/buy' ||
        loc.pathname === '/rent'
          ? 'cat_card_container auto_width'
          : loc.pathname === '/dashboard/offplan'
          ? 'cat_card_container no_third_layer'
          : 'cat_card_container'
      }
      onClick={handleNav}
      key={key}
    >
      <img
        src={image?.url ? image.url : demo}
        onError={(e) => {
          e.target.src = demo;
        }}
        alt='pic for property'
      />

      {loc.pathname !== '/offplanpage' &&
      loc.pathname !== '/dashboard/offplan' &&
      !loc.pathname.includes('/offplan') ? (
        <>
          {/* off plan page the card should only have name and address */}
          <section className='primary_info_section'>
            <p>{name}</p>

            {/* price will not be visible in suboffplan page, price will be price range */}
            {loc.pathname.includes('offplan') ||
            loc.pathname === '/dashboard/suboffplan' ? (
              <p className='price'>
                {priceConverter(price1)}
                <span>PKE</span> - {priceConverter(price2)}
                <span>PKR</span>
              </p>
            ) : (
              <p className='price'>
                {priceConverter(price)}{' '}
                <span>PKR{loc.pathname.includes('/rent') ? '/Year' : ''}</span>
              </p>
            )}
          </section>
          {loc.pathname === '/offplan' ? (
            <>
              <section className='secondary_info_section'>
                <div className='bedrooms'>
                  <i className='fa-solid fa-bed'></i>
                  {bedroom === 0 ? 'Studio' : <p>{bedroom} Bedrooms</p>}
                </div>
                <div className='bath'>
                  <i className='fa-solid fa-bath'></i>
                  <p>{bathroom} Bath</p>
                </div>
                <div className='space'>
                  <i className='fa-solid fa-house'></i>
                  <p>
                    {size} <span> sqft</span>
                  </p>
                </div>
              </section>
              <section>
                {loc.pathname === '/offplan' ? null : (
                  <div className='location'>
                    <i className='fa-sharp fa-solid fa-location-dot'></i>
                    {/* location will not be visible in suboffplan page */}
                    <p>{location}</p>
                  </div>
                )}
              </section>
            </>
          ) : (
            <>
              <section className='secondary_info_section'>
                <div className='bedrooms'>
                  <i className='fa-solid fa-bed'></i>
                  {bedroom === 0 ? 'Studio' : <p>{bedroom} Bedrooms</p>}
                </div>
                <div className='bath'>
                  <i className='fa-solid fa-bath'></i>
                  <p>{bathroom} Bath</p>
                </div>
                <div className='space'>
                  <i className='fa-solid fa-house'></i>
                  <p>
                    {size} <span> sqft</span>
                  </p>
                </div>
              </section>
              {loc.pathname === '/offplanpage' ||
              '/dashboard/offplan' ? null : (
                <section className='secondary_info_section'>
                  {loc.pathname === '/offplan' ? null : (
                    <div className='location'>
                      <i className='fa-sharp fa-solid fa-location-dot'></i>
                      {/* location will not be visible in suboffplan page */}
                      <p>{location}</p>
                    </div>
                  )}
                </section>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <section className='primary_info_section'>
            <div className='location'>
              <i className='fa-sharp fa-solid fa-location-dot'></i>
              <p>{location}</p>
            </div>
          </section>
          <section className='secondary_info_section'>
            {loc.pathname === 'offplanpage' ? (
              <p className='price'>
                {priceConverter(price1)}
                <span>PKR</span> - {priceConverter(price2)}
                <span>PKR</span>
              </p>
            ) : (
              <p>{name}</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default CategoryCard;
