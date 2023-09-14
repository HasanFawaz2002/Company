import React, { useState } from 'react';
import './Login Subscription.css';
import axios from 'axios';

const LoginSubscription = () => {
  // Initialize state to hold form data
  const [formData, setFormData] = useState({
    
    email: '',
    password: '',
  });

  // Initialize state to hold form errors
  const [formErrors, setFormErrors] = useState({
    
    email: '',
    password: '',
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
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    }
    if (!formData.password.trim()) {
      errors.password = 'password is required';
    }

    if (Object.keys(errors).length === 0) {
      // Form is valid, send a POST request using Axios
      try {
        const response = await axios.post('http://localhost:3001/loginSubscription', formData);
  
        if (response.status === 201 || response.status === 200) {
          // Handle success, e.g., display a success message
          console.log('Login Subscription successfully');
          localStorage.setItem("access_token", response.data.accessToken);
          localStorage.setItem("userId", response.data.subscribtion._id);
          localStorage.setItem("role", response.data.subscribtion.role);
  
          // Clear form errors and reset form data
          setFormErrors({
            email: '',
            password: '',
          });
          setServerError('');
  
          // Optionally, redirect or perform other actions on success
        }
      } catch (error) {
        if (error.response) {
            const { data } = error.response;
            console.log("Backend error response:", data);
            if (data.error && data.error === "Email or Password is not valid") {
                setServerError('"Email or Password is not valid"');
            } else {
              console.error("login failed:", error);
            }
          } else {
            console.error("login failed:", error);
          }
      }
    } else {
      // Set form errors
      setFormErrors(errors);
    }
  };
  return (
    <>
      <div className='login-subscription-container'>
        <h1>Login Subscription</h1>
        {serverError && <div className='error-message'>{serverError}</div>}
        <form onSubmit={handleSubmit}>
          
          
          <div className='login-subscription-container-form-container'>
            <label htmlFor='email'>Email:</label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && <span className='error-message'>{formErrors.email}</span>}
          </div>
          <div className='login-subscription-container-form-container'>
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
            />
            {formErrors.password && <span className='error-message'>{formErrors.password}</span>}
          </div>
          
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginSubscription;
