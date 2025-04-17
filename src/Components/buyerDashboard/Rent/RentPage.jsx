import React from "react";
import "./RentPage.css";
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { token } from "../../../Hooks/UserHooks";
import CategoryCard from "../../CategoryCard/CategoryCard";
import RentForm from "./RentForm";
import { showToast } from "../../../Utils/showToast";
import dltIcon from "../../../Assets/images/deleteIcon.svg";
import editIcon from "../../../Assets/images/editIcon.svg";
import { Button } from "react-bootstrap";
import { APP_CONFIG } from "../../../config";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from "react-router-dom";



const Rentpage = () => {
  const navigate = useNavigate()
  let userId;
    if (token){
      const decodedToken = jwtDecode(token);
      userId = decodedToken?.userId;
    }else{
      navigate("/")
    }
  let initialValue = {
    name: "",
    appartement_type: "",
    category: "",
    location: "",
    floor: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    parkings: "",
    additional_features: "",
    furnished: false,
    description: "",
    status: "",
    availibility: "",
    price: "",
    neighborhood: "",
    unit_type: "",
    payment_plan: "",
    hand_over_date: "",
    WhatsAppNumber: "",
    rented_by:"",
    address:""
  };
  const baseUrl = `${APP_CONFIG.backendUrl}api/rent`;
  const [show, setShow] = useState(false);
  // const [search, setSearch] = useState({ search: "" });
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useReducer((x) => x + 1, 0);
  const [images, setImages] = useState([]);
  const [editImages, setEditImages] = useState([]);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null); 
  const [property, setProperty] = useState({
    name: "",
    appartement_type: "",
    category: "",
    location: "",
    floor: "",
    size: "",
    bedrooms: "",
    bathrooms: "",
    parkings: "",
    additional_features: "",
    furnished: false,
    description: "",
    status: "",
    availibility: "",
    price: "",
    neighborhood: "",
    unit_type: "",
    payment_plan: "",
    WhatsAppNumber:"",
    hand_over_date: "",
    rented_by:"",
    address:""
  });


  const handleClose = () => {
    setShow(false);
    setEdit(false);
    setEditImages([]);
    setImages("");
    setProperty(initialValue);
  };
  
  // useEffect(() => {
  //   async function getAllProperties() {
  //     try {
  //       await axios
  //         .get(`${baseUrl}/search`, {
  //           params: { search },
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         })
  //         .then((res) => setData(res.data));
  //     } catch (error) {
  //       showToast("could not fetch properties", "error");
  //     }
  //   }
  //   getAllProperties();
  // }, [search, refresh]);
  //handle search input
  // function handleSearchChange(e) {
  //   let { name, value } = e.target;
  //   setSearch({
  //     ...search,
  //     [name]: value,
  //   });
  // }
  async function createProperty() {
    console.log(property.hand_over_date || "Soon")
    try {
      let formData = new FormData();
      if (images) {
        formData.append("user", userId);
        images.forEach((image) => formData.append("image", image));
        formData.append("name", property.name);
        formData.append("appartement_type", property.appartement_type);
        formData.append("additional_features", property.additional_features);
        formData.append("bathrooms", property.bathrooms);
        formData.append("bedrooms", property.bedrooms);
        formData.append("category", property.category);
        formData.append("description", property.description);
        formData.append("neighborhood", property.neighborhood);
        formData.append("unit_type", property.unit_type);
        formData.append("payment_plan", property.payment_plan);
        formData.append("hand_over_date", property.hand_over_date ? property?.hand_over_date : "Soon");
        formData.append("floor", property.floor);
        formData.append("price", property.price);
        formData.append("location", property.location);
        formData.append("WhatsAppNumber", property.WhatsAppNumber);
        formData.append("furnished", property.furnished);
        formData.append("parkings", property.parkings);
        formData.append("size", property.size);
        formData.append("rented_by", property.rented_by);
        formData.append("address",property.address)


      }
      if (edit === true) {
        await axios
          .put(
            `${baseUrl}/${property._id}`,
            images.length > 0 ? formData : { ...property, hand_over_date: property?.hand_over_date ? property?.hand_over_date : "Soon" },
            {
              headers: {
                "Content-Type":
                  images.length > 0
                    ? "multipart/form-data"
                    : "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              setLoading(false)
              showToast("property Updated successfully", "success");
              setShow(false);
              setEdit(false);
              setRefresh();
              setProperty(initialValue);
              setImages([]);
            } else {
              setLoading(false)
              showToast("Error! try again later ", "error");
            }
          });
      } else {
        await axios
          .post(baseUrl, images.length > 0 ? formData : { ...property, hand_over_date: property?.hand_over_date ? property?.hand_over_date : "Soon" }, {
            headers: {
              "Content-Type":
                images.length > 0 ? "multipart/form-data" : "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 201) {
              setLoading(false)
              showToast("property Created successfully", "success");
              setShow(false);
              setRefresh();
              setProperty(initialValue);
              setImages([]);
            } else if (res.status === 409) {
              setLoading(false)
              showToast("Property name already exists !", "error");
            } else {
              setLoading(false)
              showToast("Error! try again later ", "error");
            }
          });
      }
    } catch (error) {
      if (error.response.status === 409) {
        setLoading(false)
        showToast("Property name already exists !", "error");
      } else {
        setLoading(false)
        showToast("Error! try again later ", "error");
      }
    }
  }
  async function deleteProperty(id) {
    try {
     
      await axios
        .delete(`${baseUrl}/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            showToast("property deleted successfully", "success");
            setRefresh()
          }
        });
    } catch (error) {
      showToast("Error in removeing property", "error");
    }
  }
  async function deleteSingleImage(imageId, propertyId) {
    try {
      setLoading(true)
      await axios
        .get(`${baseUrl}/image/${propertyId}/${imageId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 201) {
            setLoading(false)
            showToast("Image removed successfully", "success");
            const newImages = editImages.filter(
              (image) => image.public_id !== imageId
            );
            setEditImages(newImages);
          } else {
            setLoading(false)
            showToast("Error ! try again later", "error");
          }
        });
    } catch (error) {
      setLoading(false)
      showToast("Error ! try again later", "error");
    }
  }
  function editItem(item) {
    setProperty(item);
    setEditImages(item.image);
    setEdit(true);
    setShow(true);
  }

  useEffect(() => {
    // Check if token and backendUrl are properly set
    if (!token || !APP_CONFIG?.backendUrl) {
      setError("Missing token or backend URL configuration.");
      setLoading(false);
      return;
    }

    // Make the API call
    axios
      .get(`${APP_CONFIG.backendUrl}api/user-properties`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data.rent);
        setLoading(false);
      })
      .catch((error) => {
        // Handle server and client errors
        const errorMessage = error.response
          ? error.response.data.message || "An error occurred on the server."
          : error.message || "Network error. Please try again.";
        setError(errorMessage);
        setLoading(false);
      });
  }, []);


  return (
    <>
      <main className="buy-page-parent">
        <div className="property-page-container">
          <h1 className="users-page-title">Rent Properties</h1>
          <div className="users-page-header-container">
          {/* <label className="label">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input
          className="commun_input"
          type="text"
          name="search"
          placeholder="Search by property name"
          onChange={handleSearchChange}
        />
        </label> */}
            <Button onClick={() => setShow(!show)} style={{marginLeft: "auto"}}>Add</Button>
          </div>
          <div className="properties_content">
            {data?.map((card, index) => (
              <>
                <img
                  src={dltIcon}
                  alt="delete icon"
                  onClick={() => deleteProperty(card._id)}
                  className="delete-button"
                />
                <img
                  src={editIcon}
                  alt="edit icon"
                  onClick={() => editItem(card)}
                  className="edit-button"
                />
                <CategoryCard
                  location={card.location}
                  price={card.price}
                  key={index}
                  name={card.name}
                  bedroom={card.bedrooms}
                  bathroom={card.bathrooms}
                  size={card.size}
                  id={card._id}
                  type={card.property_type}
                  image={card.image[0]}
                />
              </>
            ))}
            <div className="divider_spacer"></div>
          </div>
        </div>
        <RentForm
          show={show}
          onHide={handleClose}
          images={editImages}
          setImages={setImages}
          property={property}
          setProperty={setProperty}
          createProperty={createProperty}
          edit={edit}
          deleteImage={deleteSingleImage}
          setEdit={setEdit}
          loading={loading}
          setLoading={setLoading}
        />
      </main>
    </>
  );
};

export default Rentpage;
