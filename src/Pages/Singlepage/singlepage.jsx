import './singlepage.css';
// import LeadForm from '../../Components/Leadform/LeadForm';
// import Modal from 'react-modal';
import { useParams, useLocation, useNavigate } from 'react-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import demo from '../../Assets/images/estate-hero.jpg';
import fallbackImage from '../../Assets/images/estate-hero.jpg';
import { priceConverter } from '../../Utils/currencyUtils';
import { APP_CONFIG } from '../../config';
import { token } from "../../Hooks/UserHooks";
import { jwtDecode } from 'jwt-decode';

const Singlepage = () => {
  const location = useLocation();
  let params = useParams();
  let userId;
      if (token){
        const decodedToken = jwtDecode(token);
        userId = decodedToken?.userId;
      }
  const type = params.type;
  let id = params.id;
  const [viewm, setViewm] = useState(false);
  const [property, setProperty] = useState([]);
  const [image, setImage] = useState([]);
  const [showModal, setShowModal] = useState(false);
const navigate =useNavigate()
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  console.log(property.user)
  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `${APP_CONFIG.backendUrl}api/allProp/${type}/${id}`
        );
        setProperty(response.data);
        setImage(response.data.image);
      } catch (error) {
        console.error(error);
      }
    };
    getItem();
  }, [id, type]);


  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const scrollCarousel = useCallback(() => {
    if (viewm) {
      const slideWidth = carouselRef.current.offsetWidth;
      carouselRef.current.scrollLeft = currentIndex * slideWidth;
    }
  }, [currentIndex, viewm]);

  useEffect(() => {
    scrollCarousel();
  }, [scrollCarousel]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % property.image.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? property.image - 1 : prevIndex - 1
    );
  };

  const phoneNumber = '+971 52 727 9898';

  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <>
      {viewm ? (
        <div className='forbtn_crsl'>
          <button className='prev-button' onClick={goToPrev}>
            <i className='fa-solid fa-chevron-left'></i>
          </button>
          <button className='next-button' onClick={goToNext}>
            <i className='fa-solid fa-chevron-right'></i>
          </button>
          <div className='absolutly' ref={carouselRef}>
            {property &&
              property.image?.map((image, index) => (
                <img
                  key={index}
                  src={image.url || demo}
                  alt={`Details ${index}`}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
              ))}
            <button
              className='exit_viewmore'
              onClick={() => {
                setViewm(false);
              }}
            >
              <i className='fa-regular fa-circle-xmark'></i>
            </button>
          </div>
        </div>
      ) : null}
      <section className='single-parent'>
        <div className='single-left'>
          <button
            type='button'
            className='button-single rb_btn'
            onClick={() => {
              setViewm(true);
            }}
          >
            View more
          </button>
          {image.map((img, index) => {
            let className = 'grid-item';

            if (image.length === 1) {
              className = 'grid-item full-size';
            } else if (image.length === 2) {
              className = 'grid-item double-width';
            } else if (image.length >= 3 && index === 0) {
              className = ' double-width first-row';
            }

            return (
              index < 3 && (
                <img
                  key={index}
                  src={img && img.url ? img.url : fallbackImage}
                  alt={`property ${index + 1}`}
                  className={className}
                  onError={(e) => {
                    e.target.src = fallbackImage;
                  }}
                />
              )
            );
          })}
        </div>
        <div className='single-description'>
          <div className='signle-text'>
            <h1>Name: {property.name}</h1>
            <h2>Type: {property.appartement_type}</h2>
            <h3>Category: {property.category}</h3>
            {type && type !== 'SubOffPlan' ? (
              <h4 className='rb_location'>
                Location:
                {property &&
                property?.location &&
                property?.location?.length > 0 ? (
                  <a
                    href={property.location}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Click to Visit location
                  </a>
                ) : (
                  <p>No Location given to this property</p>
                )}
              </h4>
            ) : null}
            {property && property?.address ? (
              <h4 className='rb_location'>
                Address:
                <p>{property.address}</p>
              </h4>
            ) : null}
            {type && type !== 'SubOffPlan' ? (
              <h2>Price: {priceConverter(property.price)} PKR</h2>
            ) : (
              <h2>
                {property.price_low || property.price_high
                  ? `${priceConverter(
                      property?.price_low
                    )} PKR - ${priceConverter(property?.price_high)} PKR`
                  : 'N/A'}
              </h2>
            )}
            <div className='appartment-details'>
              {type && type !== 'SubOffPlan' ? (
                <div className='single-icons'>
                  <i className='fa-solid fa-building icons'></i>
                  <h4>Floor: {property.floor}</h4>
                </div>
              ) : null}

              <div className='single-icons'>
                <i className='fa-solid fa-house icons'></i>
                <h4>
                  Size: {property.size} <span>sqft</span>
                </h4>
              </div>
              <div className='single-icons'>
                <i className='fa-solid fa-bed icons'></i>
                {property.bedrooms === 0 ? (
                  <h4>Studio</h4>
                ) : (
                  <h4>Bedrooms: {property.bedrooms}</h4>
                )}
              </div>
              <div className='single-icons'>
                <i className='fa-solid fa-bath icons'></i>
                <h4>Bathrooms: {property.bathrooms}</h4>
              </div>
              <div className='single-icons'>
                <i className='fa-solid fa-car icons'></i>
                <h4>Parking: {property.parkings}</h4>
              </div>
              {property.unit_type && (
                <div className='single-icons'>
                  <i className='fa-solid fa-building-user icons'></i>
                  <h4>Unit Type: {property.unit_type}</h4>
                </div>
              )}

              {property.payment_plan && (
                <div className='single-icons'>
                  <i className='fa-solid fa-money-bill-wave icons'></i>
                  <h4>Payment Plan: {property.payment_plan}</h4>
                </div>
              )}

              {property.hand_over_date && (
                <div className='single-icons'>
                  <i className='fa-solid fa-file-invoice-dollar icons'></i>
                  <h4>Hand over: {property.hand_over_date}</h4>
                </div>
              )}
            </div>
            {type && type !== 'SubOffPlan' ? (
              <>
                <h4>
                  {' '}
                  Furnished:{' '}
                  {property?.furnished ? <span>Yes</span> : <span>No</span>}
                </h4>
              </>
            ) : null}
            <h4>Additional Features: {property.additional_features}</h4>

            <div className='single-buttons'>
              <a href={`https://wa.me/+971527279898`}>
                <button type='button' className='buttonag rb_btn'>
                  Whatsapp
                </button>
              </a>
              {/* <div>
                <button
                  type='button'
                  className='buttonag rb_btn'
                  onClick={toggleModal}
                >
                  Request an inquiry
                </button>

                <Modal
                  className='model_popup'
                  isOpen={showModal}
                  onRequestClose={closeModal}
                  contentLabel='Inquiry Modal'
                >
                  <button className='close-button' onClick={closeModal}>
                    <i className='fa-regular fa-circle-xmark'></i>
                  </button>
                  <LeadForm
                    propname={property.name}
                    type={property.property_type}
                  />
                </Modal>
              </div> */}
              <button onClick={handleCall} className='buttonag rb_btn'>
                Call
              </button>
              {/* <button
    type='button'
    className='buttonag rb_btn'
    onClick={() => {
      navigate(`/chat/${property._id}`,{
        state:{
          roomId: property._id,
          userId: userId,
          receiverId: property.user
        }
      })
    }}
  >
    Chat
  </button> */}
  <button
  type="button"
  className="buttonag rb_btn"
  onClick={async () => {
    try {
      const response = await axios.post("http://localhost:5001/api/rooms", {
        propertyId: property._id,
        senderId: userId,
        receiverId: property.user,
      });

      const { roomId } = response.data;

      // Navigate to the chat screen with the room ID
      navigate(`/chat/${roomId}`, {
        state: {
          roomId,
          userId,
          receiverId: property.user,
        },
      });
    } catch (error) {
      console.error("Error creating or getting room:", error);
    }
  }}
>
  Chat
</button>

            </div>
            <div>
              <h3>Description:</h3>
              <div dangerouslySetInnerHTML={{ __html: property.description }} />

              {/* <p className="single-p">{}</p> */}
            </div>
            <div>
              <h3>Neighborhood:</h3>
              <div
                dangerouslySetInnerHTML={{ __html: property.neighborhood }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Singlepage;
