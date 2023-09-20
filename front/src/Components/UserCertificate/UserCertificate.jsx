import React ,{ useState,useEffect } from 'react'
import axios from "axios"
import './UserCertificate.css';




function UserCertificate(){
    const [uploadedcertificates, setuploadedCertificates] = useState([]);
  const [requestedcertificates, setrequestedCertificates] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedCertificate, setSelectedCertificate] = useState(null); // Step 1
  const api = 'http://localhost:3001';
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    const fetchallCertificates = async () => {
      try {
        const response = await axios.get(`${api}/getcertificaterequestoruploaded`, {
          headers: {
            token: `Bearer ${token}`,
          },
        });
        setuploadedCertificates(response.data.uploadedCertificates);
        setrequestedCertificates(response.data.requestedCertificates);
        console.log(response.data.requestedCertificates);
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchallCertificates();
  }, []);

  
  const openDeleteModal = (certificate) => { // Step 2
    setSelectedCertificate(certificate);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedCertificate(null);
    setShowDeleteModal(false);
  };

  const deleteCertificate = async () => {
    try {
      if (selectedCertificate !== null) {
        // Delete the certificate based on whether it's an upload or a request
        if (selectedCertificate.type === 'request') {
          await axios.delete(`${api}/deleteCertificateRequest/${selectedCertificate.requestID}`, {
            headers: {
              token: `Bearer ${token}`,
            },
        });
        } else {
          await axios.delete(`${api}/certificateUploadRoute/${selectedCertificate.certificateID}`);
        }

        // Refetch certificates after deletion
        

        // Close the delete modal
        window.location.reload();
      }
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

    return(
        <>
        <div className='bg'>
       <section className='UserCertificate-container'>
       {uploadedcertificates.map((uploadedcertificate) => (
        <div className='UserCertificate-card'  key={uploadedcertificate._id}>
            <img src={`${api}/certificateUploadPhoto/${uploadedcertificate._id}/photo`} 
            alt="uploadCertificate" className='UserCertificate-card-image' 
           />        
            <h3 className='UserCertificate-card-headtwo'>{uploadedcertificate.name}</h3>
            <li className='UserCertificate-card-firstp'>Description:{uploadedcertificate.description}</li>
            <li className='UserCertificate-card-firstp'>Status:{uploadedcertificate.status}</li>
            <li className='UserCertificate-card-firstp'>Type:Uploaded</li>
            <div className='UserCertificatebtn'>
               <button className='UserCertificate-cancel' onClick={() => openDeleteModal({ certificateID: uploadedcertificate._id, type: 'upload' })}>Cancel</button>
            </div>
        </div>
       
      ))}   
      

{requestedcertificates.map((requestedcertificate) => (
        <div className='UserCertificate-card' key={requestedcertificate.certificateID._id}>
         
         <img src={`http://localhost:3001/getCertificatePhoto/${requestedcertificate.certificateID._id}/photo`} alt={`${requestedcertificate.certificateID.id}`} 
         className='UserCertificate-card-image' 
         />
           
            <h3 className='UserCertificate-card-headtwo'>{requestedcertificate.certificateID.name}</h3>
            <li className='UserCertificate-card-firstp'>Description:{requestedcertificate.certificateID.description}</li>
            <li className='UserCertificate-card-firstp'>Status:{requestedcertificate.status}</li>
            <li className='UserCertificate-card-firstp'>Type:Requested</li>
            <div className='UserCertificatebtn'>
               <button className='UserCertificate-cancel' onClick={() => openDeleteModal({ requestID: requestedcertificate._id, type: 'request' })}>Cancel</button>
            </div>
          
        </div>
      ))} 

      
        </section>
        </div>
        {showDeleteModal && (
        <div className="modal">
          <span className="close" title="Close Modal" onClick={closeDeleteModal}>
            x
          </span>
          <form className="modal-content">
            <div className="container">
              <h1 className="modal-header">Delete Certificate</h1>
              <p>Are you sure you want to delete this certificate?</p>

              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={closeDeleteModal}>
                  Cancel
                </button>
                <button type="button" className="deletebtn" onClick={deleteCertificate}>
                  Delete
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
        </>
    )
}

export default UserCertificate;

