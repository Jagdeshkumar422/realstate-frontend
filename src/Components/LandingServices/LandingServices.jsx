import React, { useState } from "react";
import { Element } from "react-scroll";
import "./landingservices.css";
import reb from "../../Assets/images/Real_Estate_Brokerage.png";
import pm from "../../Assets/images/Property_Management.png";
import { HashLink as Button } from "react-router-hash-link";

const LandingServices = () => {
  const [animate, setAnimate] = useState(false);

  function animation() {
    const viewportWidth = window.innerWidth;
    const viewportheight = window.innerHeight;
    let scrollPosition;

    if (viewportWidth >= 1300) {
      scrollPosition = 400;
    } else if (viewportWidth <= 1300 && viewportWidth > 850) {
      scrollPosition = 300;
    } else if (viewportWidth <= 850 && viewportWidth > 480) {
      scrollPosition = viewportheight * 0.3;
    } else if (viewportWidth <= 480) {
      scrollPosition = 300;
    } 
    if (window.scrollY >= scrollPosition) {
      setAnimate(true);
    } else {
      setAnimate(false);
    }
  }

  window.addEventListener("scroll", animation);

  return (
    <Element name="L_services" className="L_services">
      <section id="L_services">
        <div className="services_container">
          <h1 className="services_header">Our Services</h1>
          <div className="services_cards_wrapper">
            <div
              className={animate ? "service_card fade" : "service_card"}
              style={animate ? { transitionDelay: ".2s", opacity: 1 } : {}}
            >
              <img src={reb} alt="Real estate brokerage" />
              <h2>Real Estate Brokerage</h2>
              <Button
              className="rbn_btn" 
                smooth
                to="/aboutus#reb"
                scroll={(el) => {
                  const targetElement = document.getElementById("reb");
                  if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                      top: window.scrollY + rect.top - 300,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                Learn more
              </Button>
            </div>
            <div
              className={animate ? "service_card fade" : "service_card"}
              style={animate ? { transitionDelay: ".3s", opacity: 1 } : {}}
            >
             <img src={pm} alt="Property Management" />
              <h2>Property Management</h2>
              <Button 
              className="rbn_btn" smooth to="/aboutus#pm" scroll={(el) => {
                  const targetElement = document.getElementById("pm");
                  if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                      top: window.scrollY + rect.top - 300,
                      behavior: "smooth",
                    });
                  }
                }}>
                Learn more
              </Button>
            </div>
            {/* <div
              className={animate ? "service_card fade" : "service_card"}
              style={animate ? { transitionDelay: ".5s", opacity: 1 } : {}}
            >
              <img src={rei} alt="Real Estate Investing" />
              <h2>Real Estate Investing</h2>
              <Button className="rbn_btn" smooth to="/aboutus#rei" scroll={(el) => {
                  const targetElement = document.getElementById("rei");
                  if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                      top: window.scrollY + rect.top - 300, 
                      behavior: "smooth",
                    });
                  }
                }}>
                Learn more
              </Button>
            </div>
            <div
              className={animate ? "service_card fade" : "service_card"}
              style={animate ? { transitionDelay: ".7s", opacity: 1 } : {}}
            >
              <img src={rec} alt="Real Estate Consulting" />
              <h2>Real Estate Consulting</h2>
              <Button 
              className="rbn_btn" smooth to="/aboutus#rec" scroll={(el) => {
                  const targetElement = document.getElementById("rec");
                  if (targetElement) {
                    const rect = targetElement.getBoundingClientRect();
                    window.scrollTo({
                      top: window.scrollY + rect.top - 300, 
                      behavior: "smooth",
                    });
                  }
                }}>
                Learn more
              </Button>
            </div> */}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default LandingServices;
