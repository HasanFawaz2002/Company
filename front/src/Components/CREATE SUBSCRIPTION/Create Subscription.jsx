import React, { useState, useEffect } from 'react';
import './Create Subscription.css';
import axios from 'axios';

const CreateSubscription = () => {
  // Initialize state to hold form data
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    email: '',
    position: '',
    institutionID: '', // Add a new state to store the selected institution
  });

  // Initialize state to hold form errors
  const [formErrors, setFormErrors] = useState({
    name: '',
    location: '',
    email: '',
    position: '',
    institutionID: '',
  });

  // Initialize state to hold server error message
  const [serverError, setServerError] = useState('');

  // Initialize state to hold the list of institutions
  const [institutions, setInstitutions] = useState([]); // Initialize as an empty array

  // Fetch the list of institutions from the API
  useEffect(() => {
    axios.get('http://localhost:3001/getAllInstitutions')
      .then((response) => {
        // Update the institutions state with the fetched data
        setInstitutions(response.data.institutions);
      })
      .catch((error) => {
        console.error('Error fetching institutions:', error);
        // Handle the error, e.g., set institutions to an empty array
        setInstitutions([]);
      });
  }, []); // Empty dependency array means this effect runs once when the component mounts

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Special case for the selectedInstitution field
    if (name === 'institutionID') {
      setFormData({
        ...formData,
        institutionID: value, // Store the selected institution's ID
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
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
    if (!formData.position.trim()) {
      errors.position = 'Position is required';
    }
    if (!formData.institutionID) {
        errors.institutionID = 'Select an institution';
      }

    if (Object.keys(errors).length === 0) {
      // Form is valid, send a POST request using Axios
      try {
        const response = await axios.post('http://localhost:3001/createsubscription', formData);

        if (response.status === 201) {
          // Handle success, e.g., display a success message
          console.log('Subscription created successfully');
          window.location.reload();
          
          // Clear form errors and reset form data
          setFormErrors({
            name: '',
            location: '',
            email: '',
            position: '',
            selectedInstitution: '',
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
            setServerError('Subscription creation failed. Please try again later.');
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
      <div className='create-subscription-container'>
        <h1>Create Subscription</h1>
        {serverError && <div className='error-message'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          <div className='create-subscription-container-form-container'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && <span className='error-message'>{formErrors.name}</span>}
          </div>
          <div className='create-subscription-container-form-container'>
            <label htmlFor='location'>Location:</label>
            <input
              type='text'
              name='location'
              value={formData.location}
              onChange={handleInputChange}
            />
            {formErrors.location && <span className='error-message'>{formErrors.location}</span>}
          </div>
          <div className='create-subscription-container-form-container'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
          </div>
          <div className='create-subscription-container-form-container'>
            <label htmlFor='position'>Position:</label>
            <select
              name='position'
              value={formData.position}
              onChange={handleInputChange}
            >
              <option value=''>Position</option>
              <option value='HR'>HR</option>
              <option value='Admin'>Admin</option>
              <option value='Hiring manager'>Hiring Manager</option>
            </select>
            {formErrors.position && <span className='error-message'>{formErrors.position}</span>}
          </div>
          <div className='create-subscription-container-form-container'>
            <label htmlFor='selectedInstitution'>Select an Institution:</label>
            <select
              name='institutionID'
              value={formData.selectedInstitution}
              onChange={handleInputChange}
            >
              <option value=''>Select an Institution</option>
              {institutions.map((institution) => (
                <option key={institution._id} value={institution._id}>
                  {institution.name}
                </option>
              ))}
            </select>
            {formErrors.institutionID && (
              <span className='error-message'>{formErrors.institutionID}</span>
            )}
          </div>
          <button type='submit'>Add Institution</button>
        </form>
      </div>
    </>
  );
};

export default CreateSubscription;
