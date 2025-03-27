// src/components/SubscriptionModal.js

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import './modal.css';

const SubscriptionModal = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const modalShown = localStorage.getItem('modalShown');
    if (!modalShown) {
      setShow(true);
      localStorage.setItem('modalShown', 'true');
    }
  }, []);

  const handleClose = () => setShow(false);

  const handleSubmit = (e, values, { setSubmitting }) => {
    const mailtoLink = `mailto:info@aimrealestate.net?subject=${values?.name} Subscribed to AIM Real Estate&body=Name: ${encodeURIComponent(
      values.name
    )}%0D%0AEmail: ${encodeURIComponent(
      values.email
    )}%0D%0APhone: ${encodeURIComponent(
      values.phone
    )}%0D%0ACountry: ${encodeURIComponent(values.country)}`;

    window.location.href = mailtoLink;
    e.preventDefault();
    setSubmitting(false);
    handleClose();
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required')
      .min(2, 'Name must be at least 2 characters'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .required('Phone number is required')
      .matches(
        /^[0-9]+$/,
        'Phone number is not valid, only digits are allowed'
      )
      .min(10, 'Phone number must be at least 10 digits')
      .max(15, 'Phone number must be at most 15 digits'),
    country: Yup.string().required('Country is required'),
  });

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header>
        <Modal.Title>
          Stay Updated With The Latest UAE Real Estate News & Property
          Offerings.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '', email: '', phone: '', country: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, values, setSubmitting }) => (
            <Form>
              <Form.Group controlId='formName'>
                <Form.Label>Name</Form.Label>
                <Field as={Form.Control} type='text' name='name' />
                <ErrorMessage
                  name='name'
                  component={Form.Text}
                  className='text-danger'
                />
              </Form.Group>

              <Form.Group controlId='formEmail'>
                <Form.Label>Email</Form.Label>
                <Field as={Form.Control} type='email' name='email' />
                <ErrorMessage
                  name='email'
                  component={Form.Text}
                  className='text-danger'
                />
              </Form.Group>

              <Form.Group controlId='formPhone'>
                <Form.Label>Phone</Form.Label>
                <Field as={Form.Control} type='text' name='phone' />
                <ErrorMessage
                  name='phone'
                  component={Form.Text}
                  className='text-danger'
                />
              </Form.Group>

              <Form.Group controlId='formCountry'>
                <Form.Label>Country</Form.Label>
                <Field as={Form.Control} type='text' name='country' />
                <ErrorMessage
                  name='country'
                  component={Form.Text}
                  className='text-danger'
                />
              </Form.Group>

              <Button
                variant='primary'
                onClick={(e) => handleSubmit(e, values, { setSubmitting })}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default SubscriptionModal;
