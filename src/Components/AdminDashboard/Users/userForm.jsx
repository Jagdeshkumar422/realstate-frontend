import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import * as formik from "formik";
import * as Yup from "yup";

const UserForm = ({ show, onHide, user, createUser, setUser }) => {
  const { Formik } = formik;
  /**
   * @brief Creates a new Yup schema for validating form inputs
   */
  const schema = Yup.object().shape({
    name: Yup.string().required().min(3).max(30),
    email: Yup.string().email().required().min(3).max(30),
    password: Yup.string().required().min(4).max(12),
  });
  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  return (
    <>
      <Modal show={show} onHide={onHide} centered>
        <Formik validationSchema={schema} initialValues={user} onSubmit={(values) => {
          // Handle form submit
          if (values.name && values.email && values.password) {
            createUser()
          }
        }}>
          {({ handleSubmit, handleChange, values, touched, errors }) => (
            <Form onSubmit={handleSubmit} noValidate>
              <Modal.Header>
                <Modal.Title>Add User</Modal.Title>
              </Modal.Header>
              <Modal.Body className="modal-body">
                <Form.Group controlId="validationFormik01">
                  <Form.Label> name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.name && !errors.name}
                    isInvalid={!!errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label> Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    value={values.email}
                    onChange={(event) => {
                      handleChange(event);
                      handleInputChange(event);
                    }}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik03">
                  <Form.Label> Password</Form.Label>
                  <Form.Control type="text"  
                  name="password"
                  value={values.password}
                  onChange={(event) => {
                    handleChange(event);
                    handleInputChange(event);
                  }}
                  isValid={touched.password && !errors.password}
                  isInvalid={!!errors.password} />
                  <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                  Cancel
                </Button>
                <Button type="submit">add</Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

export default UserForm;
