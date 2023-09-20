import React, { useState, useEffect } from "react";
import './AllInstitutions.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaRegHandPointer,FaSearch   } from "react-icons/fa";
import { Link } from "react-router-dom";



function AllInstitutions() {
    const [institutions, setInstitutions] = useState([]); 
    const [searchInput, setSearchInput] = useState("");
    const [filteredInstitutions, setFilteredInstitutions] = useState([]);

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

      useEffect(() => {
        // Filter the institutions based on the search input
        const filtered = institutions.filter((institution) =>
          institution.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          institution.email.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredInstitutions(filtered);
      }, [searchInput, institutions]);

  return (
    <>
    <div className="search-institutions">
        <FaSearch  />
    <input type="text" placeholder="Search By Name or Email" onChange={(e) => setSearchInput(e.target.value)}/>
    </div>
    
    <div className="all-institutions-container">
     {filteredInstitutions.map((institution) => (
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
    </>
  )
}

export default AllInstitutions