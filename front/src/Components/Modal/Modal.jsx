import React, { useEffect, useState } from 'react'
import './Modal.css';
import axios from 'axios';


const Modal = () => {
    const [certificateUploads, setCertificateUploads]= useState([]);
    const [certificateRequests, setCertificateRequests]= useState([]);

    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    useEffect(() => {

        axios
        .get("http://localhost:3001/certificates/verified",{
          headers: {
            token: `Bearer ${token}`,
          },
        
        })
        
        .then((response) => {
          // Update the institutions state with the fetched data
          setCertificateUploads(response.data.certificateUploads);
          setCertificateRequests(response.data.certificateRequests);
          console.log(response.data.certificateUploads);
          console.log(response.data.certificateRequests);
        })
        .catch((error) => {
          console.error("Error fetching certificates:", error);
          // Handle the error, e.g., set institutions to an empty array
          setCertificateUploads([]);
          setCertificateRequests([]);
        });
        
        }, []);  


  return (
    <div className='ModalOverlaySS'>
        <div className='ModalContentSS'>
            <div className='ModalWrapperSS'>
                <div className='ModalFlexBodySS'>
                    <ul>
 {certificateUploads.map((certificateUpload) => (

<li key={certificateUpload.id} className='CertificateHolderSS'>
{certificateUpload.name}: {certificateUpload.description}
</li>
  ))}
</ul>
                    <ul>
 {certificateRequests.map((certificateRequest) => (

<li key={certificateRequest.id} className='CertificateHolderSS'>
{certificateRequest.certificateID.name}: {certificateRequest.certificateID.description}
<img src={`http://localhost:3001/getCertificatePhoto/${certificateRequest.certificateID._id}/photo`} alt={`${certificateRequest.certificateID.id}`} />
</li>
  ))}
</ul>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Modal