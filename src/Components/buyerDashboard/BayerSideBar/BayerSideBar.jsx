import React from "react";
import "./buyerslider.css";
import Arrow from "../../../Assets/images/sideArrow.svg";
import Logo from "../../../Assets/images/logo_2.png";
import OnlyLogo from "../../../Assets/images/OnlyLogo.png";
import Users from "../../../Assets/images/Users.svg";
import Properties from "../../../Assets/images/properties.svg";
import messageIcon from "../../../Assets/images/chat.png"

import Rent from "../../../Assets/images/Rent.svg";
import logout from "../../../Assets/images/Logout.svg";
// import Inquiry from "../../Assets/inquiryIcon.svg";
import { Logout } from "../../../Hooks/UserHooks";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const BuyerSidebar = ({ trigger }) => {
  const [close, setclose] = useState(false);
  //  function Logout() {
  //     localStorage.removeItem("token");
  //     window.location.href="/"
  //   }

  const links = [
    // { title: "All Properties ", nav: "/all-properties", img: Rent },
    { title: "Buy ", nav: "/sell", img: Properties },
    // { title: "Developer ", nav: "/developer", img: Users },
    // { title: "OffPlan ", nav: "/offplan", img: OffplanIcon },
    { title: "Rent", nav: "/rent", img: Rent },
    // { title: "Sub offplan", nav: "/suboffplan", img: SubOffplan },
    { title: "Profile", nav: "/profile", img: Users },
    { title: "Messages", nav: "/messages", img: messageIcon },
    // { title: "Inquiries", nav: "/inquiries", img: Inquiry },
    // { title: "News", nav: "/news", img: Inquiry },
  ];
  return (
    <>
      <aside
        className={`${close ? "sidebarparentclosed" : "sidebarparent"} ${
          trigger ? "sidebarparent open" : null
        }`}
      >
        <div onClick={() => setclose(!close)} className="sidebarbutton">
          <img
            className={close ? "sidebararrowclosed" : "sidebararrow"}
            src={Arrow}
            alt="arrow"
          />
        </div>
        <div className="sidebarcontainer">
          <div className="sidebarlogo">
            <img
              className={close ? "sidebaronlylogo" : "sidebarimg"}
              src={close ? OnlyLogo : Logo}
              alt="company logo"
            />
          </div>
          <div className="navbar-body">
            <div className="linkscontainer">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  to={`/seller-dashboard${link.nav}` }
                  className={close ? "linksclosed" : "links"}
                >
                  <img
                    className="linkimg"
                    src={link.img}
                    alt={"logo for link"}
                  />
                  <p className={close ? "titleclosed" : "linktitle"}>
                    {link.title}
                  </p>
                </NavLink>
              ))}
            </div>
            <div className="logout-button-container">
              <div onClick={Logout} className={close ? "linksclosed" : "links"}>
                <img className="linkimg" src={logout} alt={"logo for link"} />
                <p className={close ? "titleclosed" : "linktitle"}>Logout</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default BuyerSidebar;
