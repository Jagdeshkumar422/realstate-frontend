import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Partners.css';

// Import the logos
import logo1 from '../../Assets/developer-logos/1.png';
import logo2 from '../../Assets/developer-logos/2.png';
import logo3 from '../../Assets/developer-logos/3.png';
import logo4 from '../../Assets/developer-logos/4.png';
import logo5 from '../../Assets/developer-logos/5.png';
import logo6 from '../../Assets/developer-logos/6.png';
import logo7 from '../../Assets/developer-logos/7.png';
import logo8 from '../../Assets/developer-logos/8.png';
import logo9 from '../../Assets/developer-logos/9.png';
import logo10 from '../../Assets/developer-logos/10.png';
import logo11 from '../../Assets/developer-logos/11.png';
import logo12 from '../../Assets/developer-logos/12.png';
import logo13 from '../../Assets/developer-logos/13.png';
import logo14 from '../../Assets/developer-logos/14.png';
import logo15 from '../../Assets/developer-logos/15.png';
import logo16 from '../../Assets/developer-logos/16.png';
import logo17 from '../../Assets/developer-logos/17.png';
import logo18 from '../../Assets/developer-logos/18.png';
import logo19 from '../../Assets/developer-logos/19.png';
import logo20 from '../../Assets/developer-logos/20.png';
import logo21 from '../../Assets/developer-logos/21.png';
import logo22 from '../../Assets/developer-logos/22.png';
import logo23 from '../../Assets/developer-logos/23.png';
import logo24 from '../../Assets/developer-logos/24.png';
import logo25 from '../../Assets/developer-logos/25.png';
import logo26 from '../../Assets/developer-logos/26.png';
import logo27 from '../../Assets/developer-logos/27.png';

const logos = [
  logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8, logo9, logo10,
  logo11, logo12, logo13, logo14, logo15, logo16, logo17, logo18, logo19, logo20,
  logo21, logo22, logo23, logo24, logo25, logo26, logo27
];

const Partners = () => {
  return (
    <div className='partners-main'>
      <h2>Our Trusted Partners</h2>
      <div className='logo-slider'>
        <div className='logo-track'>
          {logos.concat(logos).map((logo, index) => (
            <div key={index} className='partner-logo-container'>
              <img src={logo} alt={`Partner logo ${index + 1}`} className='partner-logo' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
