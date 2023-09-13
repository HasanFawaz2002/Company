import React,{useEffect,useState}from 'react';
import  './Institutionlogin.css'
import axios from "axios"
import {useNavigate,Link} from "react-router-dom"


const Institutionlogin = () => {
    const history=useNavigate()
    const [email,setEmail]=useState('')
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");




    async function submit(e) {
      e.preventDefault();
       setLoading(true);
        setError("");

        if (!email.trim() || !password.trim()) {
          setError("Please fill in both email and password fields.");
          setLoading(false);
          return;
        }
      try {
        const response = await axios.post(
          "http://localhost:3001/loginInstitution",
          {
            email,
            password,
          }
        );

        if (response.status === 200) {
          // Login successful
          const { institution, accessToken } = response.data;
             setLoading(false);

          history("/InstituteHome");
        } else {
          // Handle login failure
          console.error("Login failed");
          setLoading(false);
                  setError("Email or password is incorrect.");

          // You can display an error message to the user here
        }
      } catch (error) {
        console.error("Error during login:", error);
        setLoading(false);
              setError("An error occurred while logging in.");

      }
    }

  return (
    <div className="Institutecontainer">
      <div className="Institutionform">
        <form action="Post" className="Institutelogin">
          <label>Email</label>
          <input
            className="institute-email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email"
            name=""
            id=""
          ></input>
          <label>Password</label>

          <input
            className="institute-password"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            name=""
            id=""
          ></input>
          {error && <div className="error-message">{error}</div>}

          <input
            className="institutesubmit"
            type="submit"
            onClick={submit}
            value={loading ? "Loading..." : "Submit"}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default Institutionlogin;