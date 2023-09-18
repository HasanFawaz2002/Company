import React, { useState, useEffect } from 'react';
// import Select from 'react-select';
import axios from 'axios';
import './CertificateUpload.css';
import { useParams } from 'react-router-dom';
const CertificateUpload = () => {
    
        const [selectedFile, setSelectedFile] = useState(null);
        const [preview, setPreview] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [institutions, setInstitutions] = useState([]); 
        const [selectedInstitution, setSelectedInstitution] = useState('');
        const [name, setName] = useState('');
        const [description, setDescription] = useState('');
        const [errors, setErrors] = useState({});
        const { institutionID } = useParams();

        const handleFileChange = (e) => {
            const file = e.target.files[0];
            setSelectedFile(file);
        
            // Clear the validation error for the 'certificateFile' field if a file is selected
            if (file) {
              clearError('certificateFile');
            }
            
            if (file) {
              setSelectedFile(file);
          
              // Check if the selected file is an image or a PDF
              const isImage = file.type.startsWith('image/');
              const isPDF = file.type === 'application/pdf';
          
              // Create a URL for the selected file
              const fileURL = URL.createObjectURL(file);
          
              // Display a smaller preview based on the file type
              if (isImage) {
                // Create a smaller thumbnail by specifying width and height
                setPreview(<img src={fileURL} alt="Certificate Preview" width="70" height="70"  onClick={() => setShowModal(true)}/>);
              } else if (isPDF) {
                // Display a generic PDF icon as a thumbnail for PDF files
                setPreview(<img src="/pdf-icon.png" alt="PDF Preview" width="70" height="70"  onClick={() => setShowModal(true)}/>);
              } else {
                // Handle unsupported file types here
                setPreview(null);
              }
            } else {
              setSelectedFile(null);
              setPreview(null);
            }
          };
          
          

        const handleInstitutionChange = (e) => {
            const value = e.target.value;
            setSelectedInstitution(value);
        
            if (value.trim()) {
              clearError('institutionID');
          };}

          useEffect(() => {
            // Fetch institutions and set selectedInstitution based on institutionID
            async function fetchInstitutions() {
              try {
                const response = await axios.get('http://localhost:3001/getAllInstitutions');
                setInstitutions(response.data.institutions);
        
                // Set selectedInstitution to institutionID if it's present
                if (institutionID) {
                  setSelectedInstitution(institutionID);
                }
              } catch (error) {
                console.error('Error fetching data:', error);
              }
            }
            fetchInstitutions();
          }, [institutionID]);
          
    //       const handleNameChange = (e) => {
    //         const value = e.target.value;
    // setName(value);
    // if (value.trim()) {
    //     clearError('name');
    //   }
          // };
        
          const handleDescriptionChange = (e) => {
            const value = e.target.value;
            setDescription(value);
            if (value.trim()) {
                clearError('description');
          };}
          const clearError = (fieldName) => {
            // Create a copy of the errors state and remove the error for the specified field
            const updatedErrors = { ...errors };
            delete updatedErrors[fieldName];
            setErrors(updatedErrors);
          };

          const validateForm = () => {
            const errors = {};
            // if (!name.trim()) {
            //   errors.name = 'Name is required*';
            // }
            if (!description.trim()) {
              errors.description = 'Description is required*';
            }
            if (!selectedFile) {
              errors.certificateFile = 'Certificate file is required*';
            }
            if (!selectedInstitution) {
              errors.institutionID = 'Choose an Institution*';
            }
            setErrors(errors);
            return Object.keys(errors).length === 0;
          };


          const handleSubmit = async (e) => {
            e.preventDefault();
            if (validateForm()) {
            const formData = new FormData();
            // formData.append('name', name);
            formData.append('description', description);
            formData.append('certificateFile', selectedFile);
            formData.append('institutionID', selectedInstitution);
          
            console.log('Form Data:', formData); // Log the form data
          
            const token = localStorage.getItem("access_token");
            console.log('Access Token:', token); // Log the token
          
            try {
            console.log('Sending request to:', `http://localhost:3001/certificateUploadRoute/${selectedInstitution}`);

              const response = await axios.post(
                `http://localhost:3001/certificateUploadRoute/${selectedInstitution}`,
                formData,
                {
                  headers: {
                    token: `Bearer ${token}`,
                  },
                }
              );
              console.log('Response Data:', response.data); // Log the response data
              console.log('Upload successful:', response.data);
            } catch (error) {
              console.error('Error uploading certificate:', error);
            }
          };
        }
          
  return (
    <div className="backgroundCU">
      <div className="Certificate-upload-form-container">
        <h2 className='headerCU'>Certificate Upload Form</h2>
        <form onSubmit={handleSubmit}>
        {/* <div className="form-groupCU">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name"  className="inputNameCU"  onChange={handleNameChange}  />
          {errors.name && (
              <span className="error-name-message">{errors.name}</span>)}
              </div> */}

        <div className="form-groupCU">
          <label htmlFor="description">Description:</label>
          <textarea
          
            id="description"
            name="description"
            className={`inputDescriptionCU ${errors.description ? 'input-error' : ''}`}
            onChange={handleDescriptionChange}
          />
        </div>
        {errors.description && (
              <span className="error-name-message">{errors.description}</span>)}
       
        <div className="form-groupCU">
          <label htmlFor="institutionID">Institution:</label>
          {console.log('institutions:', institutions)} {/* Log institutions */}
  {console.log('selectedInstitution:', selectedInstitution)}
          {/* {institutions.length > 0 ? ( */}
  <select
    id="institutionID"
    name="institutionID"
    className={`inputInstitutionIDCU ${errors.institutionID ? 'input-error' : ''}`}
    value={selectedInstitution}
    onChange={handleInstitutionChange}
  >
    <option className='inputInstitutionIDCU' value="">Select an institution</option>
    {institutions.map((institution) => (
    <option className='inputInstitutionIDCU' style={{height:"3rem"}} key={institution._id} value={institution._id}>
      {institution.name}
      </option>
    ))}
  </select>

    {errors.institutionID && (
                <span style={{ marginTop:"-1.5rem" }} className="error-name-message">{errors.institutionID}</span>)}

<div className="form-groupCU1 ">
          <label htmlFor="certificateFile" className="custom-file-upload">Certificate File: <span className="choose-file-textCU">{selectedFile ? selectedFile.name : 'Choose a File'}</span>
          </label>
          <input
            type="file"
            id="certificateFile"
            name="certificateFile"
            className={`inputCertificateFileCU ${errors.certificateFile ? 'input-error' : ''}`}
            accept=".pdf, .jpg, .png"
            onChange={handleFileChange}
          />
        {errors.certificateFile && (
            <span className="error-name-message">{errors.certificateFile}</span>)}
                <div className="certificate-preview">
  {selectedFile ? (
      /* Display the preview here */
      <div onClick={() => setShowModal(true)}>{preview}</div>
      ) : (
          <p style={{ marginTop:"-1rem" }}></p>
          )}
          </div>
</div>

        </div>
<div className='buttonCU'>
        <button type="submit" className="submitButtonCU">
          Upload Certificate
        </button>
        </div>
      </form>
      </div>
            <div>
      {showModal && (
        <div className="image-modal" onClick={() => setShowModal(false)}>
          {/* Add the image to be displayed in the modal */}
          {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Certificate Preview" />}
        </div>
      )}
        </div>

    </div>
  );
};

export default CertificateUpload;
