import React, { useState } from 'react';
import './Create Institution Form.css';
import axios from 'axios';

const CreateInstitutionForm = () => {
  // Initialize state to hold form data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
  });

  // Initialize state to hold form errors
  const [formErrors, setFormErrors] = useState({
    name: '',
    location: '',
    email: '',
  });

  // Initialize state to hold server error message
  const [serverError, setServerError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous server error messages
    setServerError('');

    // Validate the form
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, send a POST request using Axios
      try {
        const response = await axios.post('http://localhost:3001/createInstitution', formData);

        if (response.status === 201) {
          // Handle success, e.g., display a success message
          console.log('Institution created successfully');
          window.location.reload();
          
           // Clear form errors and reset form data
        setFormErrors({
            name: '',
            location: '',
            email: '',
          });
          setServerError('');
  
          // Optionally, redirect or perform other actions on success

        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          if (error.response.data ) {
            // Handle the duplicate email error
            setServerError('Email already exists. Please use a different email.');
          } else {
            // Handle other server errors
            setServerError('Institution creation failed. Please try again later.');
          }
        } else {
          // Handle network or other errors
          setServerError('An error occurred. Please check your internet connection and try again.');
        }
      }
    } else {
      // Set form errors
      setFormErrors(errors);
    }
  };

  return (
    <>
      <div className='create-institution-container'>
        <h1>Create Institution</h1>
        {serverError && <div className='error-message'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className='create-institution-container-form-container'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span className='error-message'>{formErrors.name}</span>}
          </div>
          <div className='create-institution-container-form-container'>
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleInputChange}
            />
            {formErrors.location && <span className='error-message'>{formErrors.location}</span>}
          </div>
          <div className='create-institution-container-form-container'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
          </div>
          <button type='submit'>Add Institution</button>
        </form>
      </div>
    </>
  );
};

export default CreateInstitutionForm;
