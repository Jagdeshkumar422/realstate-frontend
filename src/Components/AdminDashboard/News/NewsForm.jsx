import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Spinner } from "react-bootstrap";

import ReactQuill from "react-quill";

const NewsForm = ({
  loading,
  setLoading,
  edit,
  setEdit,
  news,
  setNews,
  handleClose,
  handleUpdate,
}) => {
  const [newDescription, setNewDescription] = useState(news.description);
  const handleTitleChange = (e) => {
    setNews({ ...news, title: e.target.value });
  };
  useEffect(() => {
    setNews({ ...news, description:newDescription });
  }, [newDescription]);
  return (
    <Modal show={edit} onHide={handleClose} centered>
      <form onSubmit={handleUpdate} noValidate>
        <ModalHeader>
          <Modal.Title>Update News</Modal.Title>
        </ModalHeader>
        <ModalBody>
          <Form.Group controlId="validationFormik08">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={news.title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="validationFormik13">
            <Form.Label>Description</Form.Label>
            <ReactQuill
              value={newDescription}
              onChange={setNewDescription}
              theme="snow"
            />
          </Form.Group>
        </ModalBody>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {loading && <Spinner animation="border" role="status" />}

        <Button type="submit" onClick={() => setLoading(true)}>
          add
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default NewsForm;
