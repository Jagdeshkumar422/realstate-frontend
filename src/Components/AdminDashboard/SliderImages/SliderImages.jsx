import React, { useState, useEffect, useRef } from 'react';
import './SliderImages.css';
import axios from 'axios';
import { token } from "../../../Hooks/UserHooks";
import { APP_CONFIG } from '../../../config';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Form, Card, Spinner } from 'react-bootstrap';
import { FaUpload, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const SliderImages = () => {
  const [images, setImages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingIndex, setDeletingIndex] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${APP_CONFIG.backendUrl}api/slider-images`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setImages(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
      toast.error('Error fetching images. Please try again.');
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      await axios.post(`${APP_CONFIG.backendUrl}api/slider-images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (imageId, index) => {
    setDeletingIndex(index);
    try {
      await axios.delete(`${APP_CONFIG.backendUrl}api/slider-images/${imageId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchImages();
      toast.success('Image deleted successfully');
    } catch (error) {
      console.error('Error deleting image:', error);
      toast.error('Error deleting image. Please try again.');
    } finally {
      setDeletingIndex(null);
    }
  };

  return (
    <Container className="slider-images-container">
      <h2 className="text-center mb-4">Slider Images</h2>
      <Form className="upload-form mb-4">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Control 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*" 
            ref={fileInputRef}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleUpload} disabled={isUploading}>
          {isUploading ? (
            <>
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="mr-2" />
              <span style={{ marginLeft: '10px' }}>Uploading...</span>
            </>
          ) : (
            <>
              <FaUpload className="mr-2" /> Upload
            </>
          )}
        </Button>
      </Form>
      <Row>
        {images && images.length > 0 ? images.map((image, index) => (
          <Col key={image._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="slider-image-card">
              <Card.Img variant="top" src={image?.image?.url} alt="Slider" />
              <Card.Body>
                <Button variant="danger" onClick={() => handleDelete(image._id, index)} disabled={deletingIndex === index}>
                  {deletingIndex === index ? (
                    <>
                      <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                      <span style={{ marginLeft: '10px' }}>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <FaTrash className="mr-2" /> Delete
                    </>
                  )}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )) : (
          <Col xs={12}>
            <p className="text-center">No images found</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default SliderImages;