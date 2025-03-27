import React, { useRef, useState } from "react";
import "./contact.css";
import axios from "axios";
import emailjs from "@emailjs/browser";
import Footer from "../../Components/Footer/Footer";
import { APP_CONFIG } from "../../config";
import NavBar from "../../Components/Navbar/NavBar";

const Contactus = () => {
  const form = useRef();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState([]);
  const [myData, setmyData] = useState({
    fullName: "",
    email: "",
    Message: "",
    phone: "",
  });
  const { fullName, email, Message, phone } = myData;

  const onChange = (e) => {
    setmyData({ ...myData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const clonedForm = form.current.cloneNode(true);
      let messageField = clonedForm.querySelector('textarea[name="Message"]');
      let phoneField = clonedForm.querySelector('input[name="phone"]');
      const phoneFieldValue = phoneField.value;
      const originalMessage = messageField.value;
      const modifiedMessage = `${originalMessage}\nPhone: ${phoneFieldValue}`;
      messageField.value = modifiedMessage;
      await emailjs.sendForm(
        "service_may8wlk",
        "template_csm1gx1",
        clonedForm,
        "lRj1SgtphfwZOTqwX"
      );

      form.current.reset();
    } catch (error) {
      console.log("email sending failed", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !fullName || !Message) {
      setError("Please fill in all fields");
      return;
    }

    setLoaded(true);
    setError(null);

    const newContact = {
      fullName: fullName,
      email: email,
      Message: `${Message}\n\nPhone: ${phone}`,
      phone: phone, 
    };

    await sendEmail(e);

    try {
      const response = await axios.post(
        `${APP_CONFIG.backendUrl}contactus`,
        newContact
      );
      setInfo(response.data);
      setLoaded(false);
      setMessage(true);
      setTimeout(() => {
        setmyData({
          fullName: "",
          email: "",
          Message: "",
        });
        setMessage(false);
        setInfo(null);
      }, 3000);
    } catch (err) {
      setLoaded(false);
      setError(err?.message);
      console.log("error", err);
    }
  };

  const phoneNumber = "+971 52 727 9898";

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleMap = () => {
    window.open("https://maps.app.goo.gl/iyYWge8inKPnMwmh9?g_st=iwb", "_blank");
  };

  return (
    <>
    <NavBar/>
      <div className="contact_main">
        <div className="contact_info">
          <div className="cntct_info_header">
            <h1>Contact Information</h1>
            <p>
              Fill up the form and our team will get back to you within 24
              hours.
            </p>
          </div>
          <div className="cntct_info_content">
            <section className="phone_container">
              <span onClick={handleCall}>
                <i className="fa-solid fa-phone"></i> +92 3490438465
              </span>
            </section>
            <section
              className="email_container"
              onClick={() => {
                window.location.href = "mailto:sales@aimrealestate.net";
              }}
            >
              <span>
                <i className="fa-solid fa-envelope"></i> jagdehk953@gmail.com
              </span>
            </section>
            <section className="location_container" onClick={handleMap}>
              <span>
                <p>
                  <i className="fa-solid fa-location-dot"></i>  Main bypass road near jagdish colony mithi
                </p>
              </span>
            </section>
          </div>
          <div className="cntct_info_end">
            <div className="social_icons_container">
              <a
                href="https://facebook.com/AimRealEstateAE"
                name="Aim state Tiktok link"
                aria-labelledby="tiktoklink"
              >
                <i className="fa-brands fa-tiktok"></i>
              </a>
              <a
                href="https://facebook.com/AimRealEstateAE"
                target="_blank"
                rel="noopener noreferrer"
                className="fb_link"
              >
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://instagram.com/aimrealestateae?igshid=MmIzYWVlNDQ5Yg=="
                target="_blank"
                rel="noopener noreferrer"
                className="ig_link"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com/company/aim-realestate"
                target="_blank"
                rel="noopener noreferrer"
                className="in_link"
              >
                <i className="fa-brands fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
        <form className="contact_form" ref={form} onSubmit={onSubmit}>
          <label htmlFor="cntct_name">
            Full Name
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={onChange}
              required
              id="cntct_name"
              placeholder="Enter your full name"
            />
          </label>
          <label htmlFor="cntct_email">
            Email Address
            <input
              type="text"
              name="email"
              value={email}
              onChange={onChange}
              required
              id="cntct_email"
              placeholder="Enter your email address"
            />
          </label>
          <label htmlFor="cntct_phone">
            Phone Number
            <input
              type="tel"
              name="phone"
              value={phone}
              onChange={onChange}
              id="cntct_phone"
              placeholder="Enter your phone number"
            />
          </label>
          <label htmlFor="cntct_msg">
            Message
            <textarea
              name="Message"
              value={Message}
              onChange={onChange}
              required
              id="cntct_msg"
              placeholder="Enter your message"
            ></textarea>
          </label>
          {error ? (
            <p style={{ color: "red", fontSize: "20px" }}>{error}</p>
          ) : null}
          <button className="cntct_button" type="submit" onClick={onSubmit}>
            {!loaded ? (
              <span>Send Message</span>
            ) : (
              <svg viewBox="25 25 50 50">
                <circle r="20" cy="50" cx="50"></circle>
              </svg>
            )}
          </button>
          {message ? (
            <p className="done-email">
              Dear <i>{info.fullName}</i>,<br></br>Thank you for registering your interest. One of our sales representatives will be in contact with your shortly.
            </p>
          ) : null}
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Contactus;
