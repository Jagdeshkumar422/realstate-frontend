import React from 'react';
import { Element } from 'react-scroll';
import './footer.css';
import pic from '../../Assets/images/contact_us.png';
import { useLocation, useNavigate } from 'react-router';

const Footer = () => {
  const navigate = useNavigate();

  const navigateToPage = (route) => {
    navigate(route);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const location = useLocation();
  return (
    <Element name='footer' className='footer'>
      <section id='footer'>
        <div className='get_in_touch'>
          <h1>Get in touch</h1>
          <div className='in_touch_content'>
            <img
              src={pic}
              alt='agreement pic'
              className={
                location.pathname === '/aboutus' ? 'rounded_img_footer' : null
              }
            />
            <div className='intouch_information'>
              <div className='info_1 info'>
                <h3>
                  <i className='fa-solid fa-location-dot'></i>
                  Address
                </h3>
                <p>Main bypass road near jagdish colny mithi</p>
              </div>

              <div className='info_3 info'>
                <h3>
                  <i className='fa-solid fa-phone'></i>
                  Phone Number
                </h3>
                <p>+92 3490438465</p>
              </div>
              <div className='info_2 info'>
                <h3>
                  <i className='fa-solid fa-envelope'></i>
                  Email Address
                </h3>
                <address>
                  <a href='mailto:info@aimrealestate.net'>jagdeshk953@gmail.com</a>
                </address>
              </div>
            </div>
          </div>
        </div>
        <div className='the_end'>
          <div className='footer_nav_container'>
            <div className='footer_links'>
              <h2 onClick={() => navigateToPage('/aboutus')} tabIndex={0}>
                Services
              </h2>
              <h2 onClick={() => navigateToPage('/buy')} tabIndex={0}>
                Buy
              </h2>
              <h2 onClick={() => navigateToPage('/rent')} tabIndex={0}>
                Rent
              </h2>
              {/* <h2 onClick={() => navigateToPage('/offplanpage')} tabIndex={0}>
                OffPlan
              </h2> */}
              <h2 onClick={() => navigateToPage('/contact')} tabIndex={0}>
                Contact us
              </h2>
            </div>
            <div className='footer_icons'>
              <a
                href='https://facebook.com/'
                name='MithiMahal state Tiktok link'
                aria-labelledby='tiktoklink'
              >
                <i className='fa-brands fa-tiktok'></i>
              </a>
              <a
                href='https://facebook.com/'
                name='MithiMahal state facebook link'
                aria-labelledby='facebooklink'
              >
                <i className='fa-brands fa-square-facebook'></i>
              </a>
              <a
                href='https://instagram.com/'
                name='MithiMahal state instagram link'
                aria-labelledby='instagramlink'
              >
                <i className='fa-brands fa-instagram'></i>
              </a>
              <a
                href='https://linkedin.com/'
                name='MithiMahal state linkedIn link'
                aria-labelledby='linkedinlink  '
              >
                <i className='fa-brands fa-linkedin'></i>
              </a>
              <a
                href='https://wa.me/973243322123'
                name='MithiMahal state linkedIn link'
                aria-labelledby='linkedinlink  '
              >
                <i className='fa-brands fa-whatsapp'></i>
              </a>
            </div>
          </div>
          <div className='copyrights_container'>
            <p>
              Copyright © 2024{' '}
              <a href='http://www.ce.digital'>Competitive Edge Digital</a> | All
              rights reserved |{' '}
              {/* <span
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault();
                  navigateToPage('/privacy-policy');
                }}
                className='privacy_btn'
              >
                Privacy Policy
              </span> */}
            </p>
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Footer;