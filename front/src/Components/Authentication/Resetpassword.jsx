import React, { useState } from "react";
import axios from "axios";
import "./Resetpassword.css"; 
import {useNavigate,useParams} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye,faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Resetpassword() {

  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [password, setPassword] = useState("");
  const[passwordError,setPasswordError]=useState("");

  const [showPassword, setShowPassword] = useState(false);
  

  function togglePasswordVisibility() {
    setShowPassword((prevState) => !prevState);
  }

  function validatePassword(password) {
    // Password must contain at least one uppercase letter, one special character, and one number
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }
  const {id, token} = useParams();

  

  function handlereset(e) {
    e.preventDefault();
    setPasswordError("");
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }
    if (!validatePassword(password)) {
      setPasswordError("Please enter a valid password.");
      return;
    }
    axios.post(`${api}/reset-password/${id}/${token}`, {password})
    .then(res => {
        if(res.data.Status === "Success") {
         
            navigate('/login');
        }
    }).catch(err => console.log(err.response))
}

   
  return (
    <section className="reset-password">
    <div className="reset-password-container">
      <div className="reset-password-container-content">
          <h2 className="center reset-password-container-header2">RESET PASSWORD</h2>
          <p className="center reset-password-container-par">ENTER A NEW PASSWORD.</p>
          <form onSubmit={handlereset}>
          <div className="flexSb password">
            <input type={showPassword ? "text" : "password"} 
             name="password" placeholder="Enter password"
              id="password" value={password}
                onChange={(e) => setPassword(e.target.value)} />
                 <FontAwesomeIcon
               icon={showPassword ? faEyeSlash : faEye} 
               className="fa-eye"
               onClick={togglePasswordVisibility}
            />
            </div>
            {passwordError && (
                        <span className="error-message">{passwordError}</span>
                      )}
            <div className="centering">
              <button type="submit" className="reset-password-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Resetpassword;
