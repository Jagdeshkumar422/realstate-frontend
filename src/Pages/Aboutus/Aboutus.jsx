import "./Aboutus.css";
import Footer from "../../Components/Footer/Footer";
import broker from "../../Assets/images/Real_Estate_Brokerage.png";
import manage from "../../Assets/images/Property_Management.png";
import { useNavigate } from "react-router";
import NavBar from "../../Components/Navbar/NavBar";
const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <>
    <NavBar/>
      <section className="aboutus">
        <div className="aboutus-background">
          <h1>Who We Are</h1>
          <p className="aboutus-text">
            We are a dedicated real estate company focused on serving the people
            of Mithi and Tharparkar. Our mission is to connect buyers and
            sellers with verified and transparent property listings. Whether
            you're looking for a dream home, a lucrative investment, or an ideal
            commercial space, we are here to provide reliable expertise and
            support. With a commitment to integrity and local values, we go
            beyond real estate to help you achieve your goals and build a
            brighter future for the community.
          </p>
        </div>
      </section>
      <section className="aboutus-services-section">
        <h1>Our Services</h1>
        <div className="aboutus-services-parent">
          <div className="aboutus-services" id="reb">
            <div className="aboutus-services-images">
              <img src={broker} alt="Real estate brokerage" />
            </div>
            <div className="aboutus-services-text">
              <h2 className="">01 Real Estate Brokerage</h2>
              <p>
                Helping buyers and renters with market analysis, listings, offer
                negotiation, and closing.
              </p>
              <div className="btns_rb_wrap">
                <button
                  onClick={() => {
                    navigate("/buy");
                  }}
                  className="buttonag rb_btn"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    navigate("/rent");
                  }}
                  className="buttonag rb_btn"
                >
                  Rent
                </button>
                {/* <button
                  onClick={() => {
                    navigate("/offplanpage");
                  }}
                  className="buttonag rb_btn"
                >
                  Off Plans
                </button> */}
                <button
                  onClick={() => {
                    window.location.href = "/contact";
                  }}
                  className="buttonag rb_btn"
                >
                  Contact now
                </button>
              </div>
            </div>
          </div>
          <div className="aboutus-services" id="pm">
            <div className="aboutus-services-text1">
              <h2 className="">02 Property Management</h2>
              <p>
                We provide services for property owners and investors, such as
                tenant screening, rent collection, maintenance and repairs, and
                other property management tasks.
              </p>
              <button
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="buttonag rb_btn"
              >
                Contact now
              </button>
            </div>
            <div className="aboutus-services-images">
              <img src={manage} alt="Property Management" />
            </div>
          </div>
          {/* <div className="aboutus-services" id="rei">
            <div className="aboutus-services-images">
              <img src={invest} alt="Real Estate Investing" />
            </div>
            <div className="aboutus-services-text">
              <h2 className="aboutus-pink">Real Estate Investing</h2>
              <p>
                We provide guidance and assistance to clients seeking to invest
                wisely in Dubai's real estate market.
              </p>
              <div className="btns_rb_wrap">
                <button
                  onClick={() => {
                    navigate("/buy");
                  }}
                  className="buttonag rb_btn"
                >
                  Buy
                </button>
                <button
                  onClick={() => {
                    navigate("/rent");
                  }}
                  className="buttonag rb_btn"
                >
                  Rent
                </button>
                <button
                  onClick={() => {
                    navigate("/offplanpage");
                  }}
                  className="buttonag rb_btn"
                >
                  Off Plans
                </button>
                <button
                  onClick={() => {
                    window.location.href = "/contact";
                  }}
                  className="buttonag rb_btn"
                >
                  Contact now
                </button>
              </div>
            </div>
          </div>
          <div className="aboutus-services" id="rec">
            <div className="aboutus-services-text1">
              <h2 className="">04 Real Estate Consulting</h2>
              <p>
                We provide investment services for Dubai real estate, offering
                market insights, financial modeling, and risk assessment to
                inform client decisions.
              </p>
              <button
                onClick={() => {
                  window.location.href = "/contact";
                }}
                className="buttonag rb_btn"
              >
                Contact now
              </button>
            </div>
            <div className="aboutus-services-images">
              <img src={consult} alt="Real Estate Consulting" />
            </div>
          </div> */}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Aboutus;
