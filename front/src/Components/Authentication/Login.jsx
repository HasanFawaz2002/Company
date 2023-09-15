import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Handlelogin.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LogintoZidyia(){
    const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [contact, setContact] = useState({
    email: "",
    password: ""
  });
  const [emailError, setEmailError] = useState("");
  const [passworderror, setpasswordError] = useState("");
  const[loginError,setloginError]= useState("");

  const [showPassword, setShowPassword] = useState(false);
  

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  function handlelogin(e) {
    e.preventDefault();

    setEmailError('');
    setpasswordError('');
    setloginError('');

    let isValid=true;

    if (!contact.email) {
      setEmailError("Email address is required.");
        isValid=false;
    }else if (!validateEmail(contact.email)) {
      setEmailError("Please enter a valid email address.");
      isValid=false;
    }

    if (!contact.password) {
      setpasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(contact.password)) {
      setpasswordError("Password must contain at least 8 characters, including one uppercase letter, one special character, and one number.");
      console.log("Password validation failed:", contact.password);
      isValid = false;
    }

    if (isValid) {
    axios.post(`${api}/login`, contact)
      .then((response) => {
        console.log("Login successful!");
        console.log(response);
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("userId", response.data.user._id);
        localStorage.setItem("role", response.data.user.role);
        navigate('/');
      })
      .catch((error) => {
        if (error.response) {
          const { data } = error.response;
          console.log("Backend error response:", data);
          if (data.error && data.error === "Email or Password is not valid") {
            setloginError('"Email or Password is not valid"');
          }else if (data.message && data.message === "Please Verify your Account") {
            setloginError("Please verify your Account");
          } else {
            console.error("login failed:", error);
          }
        } else {
          console.error("login failed:", error);
        }
      });
    }
  }


    return(
       <>
        
        <div className="logintozidyia-parent">
            <div className="logintozidyia-contentWithform">
               <form className="logintozidyia-loginform" onSubmit={handlelogin}>
               <h1 className="logintozidyia-headone">My Wallet</h1>
                <div className="directiontocolumn">
                <label className="logintozidyia-label">Email:</label>
               <input
                 type="text"
                 name="email"
                 placeholder="Email Address"
                 id="loginemail"
                 className="logintozidyia-input"
                 value={contact.email}
                 onChange={handleChange}
               />
                </div>
               <div className="directiontocolumn">
               <label className="logintozidyia-label">Password:</label>
               <div className="inputwithicon">
               <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="logintozidyia-input"
                  value={contact.password}
                  onChange={handleChange}
               />
               </div>
             
               </div>
               <div className="checkboxandforgot">
               <div className="checkboxwithlebel">
               <input 
                  type="checkbox"
               />
               <label className="rememberme-label">Remember me</label>
               </div>
               <p><Link to="/forgot-password" className="logintozidyia-forgotpass">Forgot password?</Link></p>
               </div>
             
                 <button className="Signinbutton">Sign In</button>
              
              
              
               
               </form>
            </div>
        </div>
      
       </> 
    )
}

export default LogintoZidyia;