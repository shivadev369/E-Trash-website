import React, { useState } from 'react';
import axios from 'axios';
import './SchedulePickup.css';
import pickimg from '../SchedulePickup/pickup.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons';

const SchedulePickup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    contact: '',
    eWasteType: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    contact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    validateField(name, value);
  };

  const handleLocationClick = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const location = `Latitude: ${latitude}, Longitude: ${longitude}`;
      setFormData((prevData) => ({ ...prevData, location }));
    });
  };

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Name should not contain numbers or special characters.';
        }
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address.';
        }
        break;
      case 'contact':
        if (!/^[0-9]{10}$/.test(value)) {
          error = 'Contact number should be exactly 10 digits.';
        }
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
  };

  const validateForm = () => {
    const { name, email, contact } = formData;

    validateField('name', name);
    validateField('email', email);
    validateField('contact', contact);

    return !(errors.name || errors.email || errors.contact);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:3000/api/pickup-request', formData);
        if (response.status === 201) {
          alert('Form submitted successfully');
          setFormData({
            name: '',
            email: '',
            location: '',
            contact: '',
            eWasteType: ''
          });
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form.');
      }
    }
  };

  return (
    <div className="schedule-pickup">
      <h1 className="catchy-text">Let's get rid of E-waste with one step</h1>
      <div className="content-container">
        <div className="image-container">
          <img src={pickimg} alt="Pickup" className="left-image" />
        </div>
        <div className="form-container">
          <form className="pickup-form" onSubmit={handleSubmit}>
            <h2>Schedule Pickup</h2>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </label>
            <label className="location-label">
              Location:
              <div className="location-input-container">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Click the icon to use current location"
                  readOnly
                />
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  className="location-icon"
                  onClick={handleLocationClick}
                />
              </div>
            </label>
            <label>
              Contact Number:
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder="+91"
                required
              />
              {errors.contact && <span className="error">{errors.contact}</span>}
            </label>
            <label>
              Type of E-Waste:
              <select
                name="eWasteType"
                value={formData.eWasteType}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Type</option>
                <option value="electronic">Electronic</option>
                <option value="appliance">Appliance</option>
                <option value="battery">Battery</option>
                <option value="lamp">Lamp</option>
                {/* Add more options as needed */}
              </select>
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SchedulePickup;
