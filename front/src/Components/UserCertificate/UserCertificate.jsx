import React ,{ useState,useEffect } from 'react'
import axios from "axios"
import './UserCertificate.css';




function UserCertificate(){
    const [uploadedcertificates, setuploadedCertificates] = useState([]);
  const [requestedcertificates, setrequestedCertificates] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalOpen, setImageModalOpen] = useState(false);  
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

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalOpen(true);
  };

  const closeImageModal = () => {
    setImageModalOpen(false);
  };

    return(
        <>
        <div className='bg'>
       <section className='UserCertificate-container'>
       {uploadedcertificates.map((uploadedcertificate) => (
        <div className='UserCertificate-card'  key={uploadedcertificate._id}>
            <img src={`${api}/certificateUploadPhoto/${uploadedcertificate._id}/photo`} 
            alt="uploadCertificate" className='UserCertificate-card-image' 
             onClick={() => handleImageClick(`${api}/certificateUploadPhoto/${uploadedcertificate._id}/photo`)}
           />        
            <h2 className='UserCertificate-card-headtwo'>"Uploaded Certificate"</h2>
            <li className='UserCertificate-card-firstp'>Name: '{uploadedcertificate.name}'</li>
            <li className='UserCertificate-card-firstp'>Description: '{uploadedcertificate.description}'</li>
            <li className='UserCertificate-card-firstp'>Status: <span className={`statuscard-${uploadedcertificate.status}`}>'{uploadedcertificate.status}'</span></li>
           
            <div className='UserCertificatebtn'>
               <button className={`UserCertificate-cancel ${uploadedcertificate.status === 'Approved' || uploadedcertificate.status === 'Rejected' ? 'disabled' : ''}`} onClick={() => openDeleteModal({ certificateID: uploadedcertificate._id, type: 'upload' })} 
               disabled={uploadedcertificate.status === 'Approved' || uploadedcertificate.status === 'Rejected'}>Cancel</button>
            </div>
        </div>
       
      ))}   
      

{requestedcertificates.map((requestedcertificate) => (
        <div className='UserCertificate-card' key={requestedcertificate.certificateID._id}>
         
         <img src={`http://localhost:3001/getCertificatePhoto/${requestedcertificate.certificateID._id}/photo`} 
         alt={`${requestedcertificate.certificateID.id}`} 
         onClick={() => handleImageClick(`${api}/getCertificatePhoto/${requestedcertificate.certificateID._id}/photo`)}
         className='UserCertificate-card-image' 
         />
           
            <h2 className='UserCertificate-card-headtwo'>"Requested Certificate"</h2>
            <li className='UserCertificate-card-firstp'>Name: '{requestedcertificate.certificateID.name}'</li>
            <li className='UserCertificate-card-firstp'>Description: '{requestedcertificate.certificateID.description}'</li>
            <li className='UserCertificate-card-firstp'>Status:  <span className={`statuscard-${requestedcertificate.status}`}>'{requestedcertificate.status}'</span></li>
            <div className='UserCertificatebtn'>
               <button className={`UserCertificate-cancel ${requestedcertificate.status === 'Approved' || requestedcertificate.status === 'Rejected' ? 'disabled' : ''}`} onClick={() => openDeleteModal({ requestID: requestedcertificate._id, type: 'request' })}
               disabled={requestedcertificate.status === 'Approved' || requestedcertificate.status === 'Rejected'}>Cancel</button>
            </div>
          
        </div>
      ))} 

      
        </section>
        </div>
        {imageModalOpen && (
  <div className="image-modal">
    <span className="close-image-modal" onClick={closeImageModal}>
      x
    </span>
    <img src={selectedImage} alt="Certificate" className="modal-image" />
  </div>
)}
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

