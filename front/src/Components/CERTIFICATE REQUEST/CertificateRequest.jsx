import React, { useState, useEffect } from 'react';
import './CertificateRequest.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CertificateRequest() {
  const [fetchedFormData, setFetchedFormData] = useState(null); // State to hold fetched form data
  const [errorMessage, setErrorMessage] = useState(null); // State to hold error message
  const [formID, setFormID] = useState(''); 
  const [certificate, setCertificate] = useState(null);
  const [selectedCertificateID, setSelectedCertificateID] = useState('');
  const [inputFieldValues, setInputFieldValues] = useState({}); // State to hold input field values

  const navigate = useNavigate();
  const params = useParams();
  const institutionID = params.institutionID;

  const token = localStorage.getItem('access_token');
  const role = localStorage.getItem('role');
  const userID = localStorage.getItem('userId');

  useEffect(() => {
    // Check for token and role when the component mounts
    const token = localStorage.getItem('access_token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'user') {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    // Fetch form data when the component mounts
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getCustomizableFormByInstitution/${institutionID}`
        );
  
        if (response.status === 200) {
          // Set the fetched form data in state
          setFetchedFormData(response.data.customizableForm.fields);
          console.log(response.data.customizableForm._id);
          setFormID(response.data.customizableForm._id);
        } else if (response.status === 404) {
          // Handle the case where the API returns a 404 error
          setErrorMessage('There is no form for this institution');
        } else {
          // Handle other error cases
          console.error('Error fetching form data:', response.status);
          setErrorMessage('There is no form for this institution');
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error Fetching Data:', error);
        setErrorMessage('There is no form for this institution');
      }
    };
  
    fetchFormData(); // Call the fetch function
  }, [institutionID]);

  useEffect(() => {
    // Fetch certificates by institution when the component mounts
    const fetchCertificatesByInstitution = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/getCertificatesbyInstitution/${institutionID}`
        );

        if (response.status === 200) {
          // Set the fetched certificates in state
          setCertificate(response.data.certificates);
          console.log(response.data.certificates);
        } else if (response.status === 404) {
          // Handle the case where no certificates are found for this institution
          console.log('No certificates found for this institution');
        } else {
          // Handle other error cases
          console.error('Error fetching certificates:', response.status);
        }
      } catch (error) {
        // Handle network errors or other exceptions
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificatesByInstitution(); // Call the fetch function
  }, [institutionID]);

  const handleCertificateChange = (event) => {
    setSelectedCertificateID(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputFieldValues({
      ...inputFieldValues,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('access_token');
  
    try {
      // Create two separate promises for the certificate request and the input field values request
      const certificateRequestPromise = axios.post(
        `http://localhost:3001/createCertificateRequest/${institutionID}/${formID}/${selectedCertificateID}`,
        {}, // Pass an empty object as the request body
        {
          headers: {
            token: `Bearer ${token}`, // Use "Authorization" header for the bearer token
          },
        }
      );
  
      const inputFieldValuesRequestPromise = axios.post(
        `http://localhost:3001/store-values/${formID}`,
        inputFieldValues, // Include input field values in the request body
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
  
      // Use Promise.all to send both requests concurrently
      const [certificateResponse, valuesResponse] = await Promise.all([
        certificateRequestPromise,
        inputFieldValuesRequestPromise,
      ]);
  
      if (certificateResponse.status === 201) {
        // Handle successful certificate request
        console.log('Certificate request created successfully');
      } else {
        // Handle error for certificate request
        console.error('Error creating certificate request:', certificateResponse.status);
      }
  
      if (valuesResponse.status === 201) {
        // Handle successful input field values storage
        console.log('Input field values stored successfully');
      } else {
        // Handle error for input field values storage
        console.error('Error storing input field values:', valuesResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


 

  return (
    <>
      <div className="certificate-request-form-container">
        <div className="Certificate-request-form-container">
          <h2>Certificate Request Form</h2>
          {errorMessage ? (
            <h1>{errorMessage}</h1>
          ) : (
            <form onSubmit={handleSubmit}>
              
              {fetchedFormData?.map((field, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={field.fieldName}>{field.isRequired && <span className='required-span'>*</span>}{field.fieldName}</label>
                  <input
                    id={field.fieldName}
                    name={field.fieldName}
                    placeholder={field.fieldName}
                    type={field.fieldType}
                    className="inputDescriptionCU"
                    onChange={handleInputChange}
                  />
                </div>
              ))}

                <div className='custom-select'>
                <select
                
                name="certificateID"
                value={selectedCertificateID}
                onChange={handleCertificateChange}
              >
                <option value="">Select a Certificate</option>
                {certificate?.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
                </div>
                

              <div className="buttonCU">
                <button type="submit" className="submitButtonCU">
                  Request Certificate
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default CertificateRequest;
