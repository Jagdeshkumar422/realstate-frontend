import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Spinner } from 'react-bootstrap';
import dltIcon from '../../../Assets/images/deleteIcon.svg';
import * as formik from 'formik';
import * as Yup from 'yup';
import DahsboardLoader from '../../DahsboardLoader/DahsboardLoader';
import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'bootstrap/dist/css/bootstrap.min.css';
import { token } from "../../../Hooks/UserHooks";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const BuyForm = ({
  show,
  onHide,
  property,
  createProperty,
  setProperty,
  images,
  setImages,
  edit,
  deleteImage,
  setEdit,
  loading,
  setLoading,
}) => {
  const navigate = useNavigate()
  let userId;
    if (token){
      const decodedToken = jwtDecode(token);
      userId = decodedToken?.userId;
    }else{
      navigate("/")
    }
  const [description, setDescription] = useState(property.description);
  const [neighborhood, setNeighborhood] = useState(property.neighborhood);
  useEffect(() => {
    setProperty({ ...property, description: description, neighborhood: neighborhood });
  }, [description, neighborhood]);

  useEffect(() => {
    setDescription(property.description);
    setNeighborhood(property.neighborhood);
  }, [property.description, property.neighborhood]);

  const renderExistingImages = () => {
    return (
      <div className='images-parent'>
        {edit === true &&
          images.map((image, i) => (
            <div className='edit-image-container' key={i}>
              <img
                src={dltIcon}
                onClick={() => deleteImage(image.public_id, property._id)}
                alt='delete'
                className='image-dlt-icon'
              />
              <img
                className='edit-form-image'
                src={image.url}
                alt='random'
                key={i}
              />
            </div>
          ))}
      </div>
    );
  };

  const { Formik } = formik;
  const schema = Yup.object().shape({
    name: Yup.string().required().min(6),
    appartement_type: Yup.string().required(),
    size: Yup.number().required().typeError('size must be a number'),
    floor: Yup.number().required().typeError('floor must be a number'),
    bedrooms: Yup.number().required().typeError('bedrooms must be a number'),
    bathrooms: Yup.number().required().typeError('bathrooms must be a number'),
    parkings: Yup.number().required().typeError('parkings must be a number'),
    price: Yup.number().required().typeError('price must be a number'),
    WhatsAppNumber: Yup.string().required('whatsApp Number is required'),
    address: Yup.string().required('address is required'),
    category: Yup.string().required(),
  });
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setProperty({
      ...property,
      [name]: value,
    });
  };
  const handleImageChange = (e) => {
    const selectedImages = Array.from(e.target.files);
    setImages(selectedImages);
  };
  const propertyOptions = [
    'Appartement',
    'Land',
    'Penthouse',
    'Townhouse',
    'Villa',
    'Office space',
    'Retail',
    'Shop',
    'Show room',
    'Business center',
    'Warehouse',
    'Plot',
    'Studio',
  ];
  const furnishedOptions = ['true', 'false'];
  const categoryOptions = ['Residential', 'Commercial'];

  return (
    <>
      <Modal className='modal-open' show={show} onHide={onHide} centered>
        <Formik
          validationSchema={schema}
          initialValues={property}
          onSubmit={(values) => {
            // Add userId to the property data
            const propertyData = { 
              ...values,
              user: userId,  // Add the userId here
            };
            
            if (
              values.appartement_type &&
              values.name &&
              values.price &&
              values.bathrooms >= 0 &&
              values.bedrooms >= 0 &&
              values.parkings >= 0 &&
              values.floor >= 0 &&
              values.size &&
              values.address &&
              values.WhatsAppNumber &&
              values.category
            ) {
              setLoading(true);
              createProperty(propertyData);
              console.log(setProperty) // Pass the propertyData including userId
            }
          }}
        >
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Header>
                <Modal.Title>Add Property</Modal.Title>
              </Modal.Header>
              <Modal.Body
                className='modal-body'
                style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
              >
                {edit === true ? renderExistingImages() : ''}
                <Form.Group controlId='validationFormik01'>
                  <Form.Label>Images</Form.Label>
                  <Form.Control
                    className='form-control'
                    type='file'
                    onChange={handleImageChange}
                    accept='.png, .jpg, .jpeg'
                    multiple
                  />
                </Form.Group>
                <Form.Group controlId='validationFormik02'>
                  <Form.Label>Property name</Form.Label>
                  <Form.Control
                    type='text'
                    name='name'
                    value={values.name}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik14'>
                  <Form.Label>Price(in PKR)</Form.Label>
                  <Form.Control
                    type='text'
                    name='price'
                    value={values.price}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.price && !errors.price}
                    isInvalid={!!errors.price}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik03'>
                  <Form.Label> Appartment type</Form.Label>
                  <Form.Select
                    name='appartement_type'
                    value={values.appartement_type}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={
                      touched.appartement_type && !errors.appartement_type
                    }
                    isInvalid={!!errors.appartement_type}
                  >
                    <option>
                      {property.appartement_type || 'Choose Appartement type'}
                    </option>
                    {propertyOptions.map((option, i) => (
                      <option key={i} name='appartement_type' value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.appartement_type}
                  </Form.Control.Feedback>
                </Form.Group>
                {/* <Form.Group controlId='validationFormik04'>
                  <Form.Label>Unit Type</Form.Label>
                  <Form.Control
                    type='text'
                    name='unit_type'
                    value={values.unit_type}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.unit_type && !errors.unit_type}
                    isInvalid={!!errors.unit_type}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.unit_type}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik05'>
                  <Form.Label>Payment Plan</Form.Label>
                  <Form.Control
                    type='text'
                    name='payment_plan'
                    value={values.payment_plan}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.payment_plan && !errors.payment_plan}
                    isInvalid={!!errors.payment_plan}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.payment_plan}
                  </Form.Control.Feedback>
                </Form.Group> */}
                <Form.Group controlId='validationFormik06'>
                  <Form.Label>Floor</Form.Label>
                  <Form.Control
                    type='text'
                    name='floor'
                    value={values.floor}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.floor && !errors.floor}
                    isInvalid={!!errors.floor}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.floor}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik07'>
                  <Form.Label>Size (in sqft)</Form.Label>
                  <Form.Control
                    pattern='[0-9.]+'
                    type='text'
                    name='size'
                    value={values.size}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.size && !errors.size}
                    isInvalid={!!errors.size}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.size}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik08'>
                  <Form.Label>Bedrooms</Form.Label>
                  <Form.Control
                    type='text'
                    name='bedrooms'
                    value={values.bedrooms}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.bedrooms && !errors.bedrooms}
                    isInvalid={!!errors.bedrooms}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.bedrooms}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik09'>
                  <Form.Label>Bathrooms</Form.Label>
                  <Form.Control
                    type='text'
                    name='bathrooms'
                    value={values.bathrooms}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.bathrooms && !errors.bathrooms}
                    isInvalid={!!errors.bathrooms}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.bathrooms}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik05'>
                  <Form.Label>Location(url)</Form.Label>
                  <Form.Control
                    type='text'
                    name='location'
                    value={values.location}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='validationFormik05'>
                  <Form.Label>Address(area)</Form.Label>
                  <Form.Control
                    type='text'
                    name='address'
                    value={values.address}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="validationFormik05">
                  <Form.Label>Whatsapp Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="WhatsAppNumber"
                    value={values.WhatsAppNumber}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='validationFormik10'>
                  <Form.Label>Parkings</Form.Label>
                  <Form.Control
                    type='text'
                    name='parkings'
                    value={values.parkings}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.parkings && !errors.parkings}
                    isInvalid={!!errors.parkings}
                  />
                  <Form.Control.Feedback type='invalid'>
                    {errors.parkings}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik04'>
                  <Form.Label> Category</Form.Label>
                  <Form.Select
                    name='category'
                    value={values.category}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.category && !errors.category}
                    isInvalid={!!errors.category}
                  >
                    <option>{property.category || 'Choose Category'}</option>
                    {categoryOptions.map((option, i) => (
                      <option key={i} name='category' value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type='invalid'>
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId='validationFormik11'>
                  <Form.Label>Additional features</Form.Label>
                  <Form.Control
                    type='text'
                    name='additional_features'
                    value={values.additional_features}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  />
                </Form.Group>

              
                <Form.Group controlId='validationFormik05'>
                  <Form.Label>Handover Date</Form.Label>
                  <Form.Control
                    type='text'
                    name='hand_over_date'
                    value={values.hand_over_date}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId='validationFormik03'>
                  <Form.Label> Furnished</Form.Label>
                  <Form.Select
                    name='furnished'
                    value={values.furnished}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                  >
                    <option>{property.furnished || 'false'}</option>
                    {furnishedOptions.map((option, i) => (
                      <option key={i} name='appartement_type' value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId='validationFormik13'>
                  <Form.Label>Description</Form.Label>
                  <ReactQuill
                    value={description}
                    onChange={setDescription}
                    theme='snow'
                  />
                </Form.Group>
                <Form.Group controlId='validationFormik13'>
                  <Form.Label>Neighborhood</Form.Label>
                  <ReactQuill
                    value={neighborhood}
                    onChange={setNeighborhood}
                    theme='snow'
                  />
                </Form.Group>
                {edit === true ? (
                  <Form.Group controlId='validationFormik13'>
                    <p className='red-label form-gap'>
                      HINT:if you fill this field the property wont be shown to
                      the clients
                    </p>
                    <Form.Label className='red-label'>Sold to</Form.Label>
                    <Form.Control
                      rows={3}
                      type='text'
                      name='sold_to'
                      value={values.sold_to}
                      onChange={(event) => {
                        handleChange(event);
                        handleInputChange(event);
                      }}
                    />
                  </Form.Group>
                ) : (
                  ''
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant='secondary' onClick={onHide}>
                  Cancel
                </Button>
                {loading && <Spinner animation='border' role='status' />}
                <Button type='submit'>add</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default BuyForm;
