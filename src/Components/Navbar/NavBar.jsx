import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; // Corrected import
import Logo from '../../Assets/images/logo_2.png';
import './navbar.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [click, setCLick] = useState(false);
  const [color, setColor] = useState(false);
  const [user, setUser] = useState({ isLoggedIn: false, role: null }); // Default state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Toggle dropdown
  const location = useLocation();
  const navigate = useNavigate();
  console.log(user)

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token); 
        console.log(decoded)
        setUser({
          isLoggedIn: true,
          role: decoded.role || 'guest', // Fallback role
        });
      } catch (error) {
        console.error('Invalid token:', error);
        setUser({ isLoggedIn: false, role: null });
      }
    } else {
      setUser({ isLoggedIn: false, role: null }); // No token found
    }
  }, []);

  const handleInq = () => {
    window.location.href = '/contactus';
    setCLick(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    setUser({ isLoggedIn: false, role: null }); // Reset user state
    navigate('/'); // Redirect to homepage
  };

  const changeColor = () => {
    const viewportWidth = window.innerWidth;
    let scrollPosition;

    if (viewportWidth >= 1300) {
      scrollPosition = 830;
    } else if (viewportWidth <= 1300 && viewportWidth > 850) {
      scrollPosition = 680;
    } else if (viewportWidth <= 850 && viewportWidth > 480) {
      scrollPosition = 750;
    } else if (viewportWidth <= 480) {
      scrollPosition = 580;
    }

    if (window.scrollY >= scrollPosition) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener('scroll', changeColor);

  return (
    <div className={location.pathname !== '/' ? 'graynav shanty' : 'shanty'}>
      <header className={color ? 'bg_nav' : null}>
        <Link to="/">
          <img src={Logo} alt="Logo" className="nav_logo" />
        </Link>
        <ul className={click ? 'menu_left' : null}>
          <ul className="ul_lists_wrapper">
            <li>
              <Link to="/" onClick={() => setCLick(false)}>
                <div className="menu-container">
                  {click && <i className="fa fa-home"></i>}
                  <p>Home</p>
                </div>
              </Link>
            </li>
            <li className="drp_nav" tabIndex={0}>
              <div className="menu-container">
                {click && <i className="fa-regular fa-building"></i>}
                <p>Properties</p>
              </div>
              <div className="drp_nav_list">
                <Link to="/buy" onClick={() => setCLick(false)} tabIndex={0}>
                  Buy
                </Link>
                <Link to="/rent" onClick={() => setCLick(false)} tabIndex={0}>
                  Rent
                </Link>
                <div className="for_bfr"></div>
              </div>
            </li>
            <li>
              <Link to="/aboutus" onClick={() => setCLick(false)}>
                <div className="menu-container">
                  {click && <i className="fa-solid fa-people-group"></i>}
                  <p>About us</p>
                </div>
              </Link>
            </li>
            <li>
              <Link onClick={handleInq}>
                <div className="menu-container">
                  {click && <i className="fa-regular fa-address-book"></i>}
                  <p>Contact</p>
                </div>
              </Link>
            </li>
          </ul>
          <div className="nav_btns_wrapper">
            {/* <button onClick={handleInq}>Inquiry</button> */}
            {!user.isLoggedIn ? (
              <button onClick={() => navigate('/login')}>Signin/Signup</button>
            ) : user.role === "buyer" && (
              <div className="user-menu">
                <i
                  className="bx bxs-user-circle"
                  onClick={toggleDropdown}
                ></i>
                {dropdownOpen && (
                  <div className="dropdown">
                    <ul>
                      <li onClick={() => navigate('/profile')}>Profile</li>
                      <li onClick={() => navigate('/messages')}>My Message</li>
                      <li onClick={handleLogout}>Logout</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </ul>
        <div className="d-flex align-center mt-10">
          {click && <img src={Logo} alt="Logo" className="mob-logo" />}
          <div
            className="brgr_icn"
            onClick={() => setCLick(!click)}
          >
            {click ? (
              <i className="fa-solid fa-xmark"></i>
            ) : (
              <i className="fa-solid fa-bars"></i>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default NavBar;
