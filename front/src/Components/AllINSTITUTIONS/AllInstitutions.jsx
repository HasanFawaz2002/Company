import React, { useState, useEffect } from "react";
import './AllInstitutions.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaRegHandPointer  } from "react-icons/fa";
import { Link } from "react-router-dom";



function AllInstitutions() {
    const [institutions, setInstitutions] = useState([]); // Initialize as an empty array
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get("http://localhost:3001/getAllInstitutions")
          .then((response) => {
            // Update the institutions state with the fetched data
            setInstitutions(response.data.institutions);
            console.log(response.data.institutions);
          })
          .catch((error) => {
            console.error("Error fetching institutions:", error);
            // Handle the error, e.g., set institutions to an empty array
            setInstitutions([]);
          });
      }, []);
      const handleUploadButtonClick = (institutionID) => {
        navigate(`/CertificateUpload/${institutionID}`);
      };

  return (
    <div className="all-institutions-container">
     {institutions.map((institution) => (
            <div className="card red" key={institution._id}>
              <h1 className="tip">{institution.name}</h1>
              <h3 className="second-text">{institution.email}</h3>
              <h3 className="second-text">{institution.location}</h3>
              <div className="buttons-container">
                <button onClick={() => handleUploadButtonClick(institution._id)}>
                  <FaUpload /> Upload
                </button>
                <button>
                  <Link to={`/CertificateRequest/${institution._id}`} ><FaRegHandPointer /> Request</Link>
                  
                </button>
                
              </div>
            </div>
          ))}

    </div>
  )
}

export default AllInstitutions