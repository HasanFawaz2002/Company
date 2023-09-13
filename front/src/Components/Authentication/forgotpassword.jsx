import React, { useState } from "react";
import axios from "axios";
import "./forgotpassword.css"; 
import {useNavigate} from "react-router-dom";


function Forgotpassword() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  
  function validateEmail(email) {
    // A basic email validation regex pattern
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function handleforgot(e) {
    e.preventDefault();
    setEmailError("");
    if (!email) {
      setEmailError("Email adress is required.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    
    axios.post(`${api}/forgot-password`, { email })
      .then((res) => {
        if (res.data.Status === 'Success' || res.data.status === 'Success' || res.data.message === 'Reset email sent successfully') {
          navigate('/login');
        } else {
          console.log('Reset email sending failed:', res);
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log('Error response from server:', err.response);
        } else if (err.request) {
          console.log('No response received:', err.request);
        } else {
          console.log('Error during request:', err.message);
        }
      });
  }

  return (
    <section className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-container-content">
          <h2 className="center forgot-password-container-header2">Forgot Password</h2>
          <p className="center forgot-password-container-par">PLEASE ENTER YOUR EMAIL TO RESET YOUR PASSWORD.</p>
          <form onSubmit={handleforgot}>
            <input type="text" name="email" placeholder="Email Address" id="email" value={email}    onChange={(e) => setEmail(e.target.value)} />
            {emailError && (
                        <span className="error-message">{emailError}</span>
                      )}
            <div className="centering">
              <button type="submit" className="forgot-password-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Forgotpassword;
