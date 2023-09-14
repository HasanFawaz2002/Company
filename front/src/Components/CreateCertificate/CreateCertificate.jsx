import React, { useState } from "react";
import axios from "axios";
import "./CreateCertificate.css"; 
import { useNavigate, Link } from "react-router-dom";


function CreateCertificate() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const[name,setName]=useState("");
  const[description,setDescription]=useState("");
  const[image,setImage]=useState("");
  const [nameError, setnameError] = useState("");
  const [descriptionError, setdescriptionError] = useState("");
  const[imageError,setimageError]= useState("");

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);
  };
  
  



  function hsn(e) {
    e.preventDefault();

    setnameError('');
    setdescriptionError('');
    setimageError('');

    const token = localStorage.getItem('access_token');

    let isValid=true;

    if (!name) {
      setnameError("Certificate name is required.");
        isValid=false;
    }
    if (!description) {
      setdescriptionError("Description is required.");
      isValid = false;
    } 
    if (!image) {
        setimageError("Image is required.");
        isValid = false;
      } 

      

    if (isValid) {
        const createcertificateData = new FormData();
        createcertificateData.append('name',name);
        createcertificateData.append('description',description);
        createcertificateData.append('image',image);

    axios.post(`${api}/createCertificate`, createcertificateData,
    {
        headers: {
          token: `Bearer ${token}`,
        },
    }
    )
      .then((response) => {
        console.log("Create Certificate successful!");
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
          console.error("Create Certificate failed:", error);
          console.log(error);
      });
    }
  }

  return (
    <section className="createcertificate">
      <div className="createcertificate-container">
        <div className="createcertificate-content">
          <h2 className="center auth-header">Create Certificate</h2>
         
          <form onSubmit={hsn}>
            <input
              type="text"
              name="name"
              placeholder="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && (
              <span className="error-name-message">{nameError}</span>
            )}
            <input
              type="text"
              name="description"
              id="description"
              placeholder="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />            
            {descriptionError && (
              <span className="error-description-message">{descriptionError}</span>
            )}
             <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              placeholder="image"
              onChange={(e) => handleImageChange(e)}
            />    
            {imageError && (
              <span className="error-image-message">{imageError}</span>
            )}
            <div className="centering">
              <button className="submit">Create</button>
            </div>
           
          </form>
        </div>
      </div>
    </section>
  );
}

export default CreateCertificate;
