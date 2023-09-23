import React, { useEffect, useState } from 'react'
import './Modal.css';
import axios from 'axios';
import { ReactComponent as SvgBackIcon } from '../../images/icons/Arrow.svg';
import { FaShare } from 'react-icons/fa'; 
import QRCode from 'qrcode';
import { ToastContainer, toast } from 'react-toastify';


import { useNavigate } from 'react-router-dom';

const Modal = ({onClose, onSave,organizationId}) => {
    const [certificateUploads, setCertificateUploads]= useState([]);
    const [certificateRequests, setCertificateRequests]= useState([]);

    const navigate = useNavigate();

    const notify = () => toast.success('Certificate Shared Successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });



    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("role");

    useEffect(() => {
      
  
      if (!token || role !== 'user') {
        navigate('/login');
      }
    }, [navigate]);

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
          if (error.response && error.response.status === 403) {
            console.log("Token is not valid!");
            navigate('/login');
          } else {
            console.error("Error Fetching Data:", error);
          }
          // Handle the error, e.g., set institutions to an empty array
          setCertificateUploads([]);
          setCertificateRequests([]);
        });
        
        }, []);  

        const handleShareUploaded = async (certificateUploadID, certificateUploadStatus) => {
          try {
            const formData = new FormData();
        
            const qrcodeDataUrl = await QRCode.toDataURL(certificateUploadStatus);
        
            // Log the QR code URL
            console.log('QR code URL:', qrcodeDataUrl);
        
            const qrcodeBlob = await (await fetch(qrcodeDataUrl)).blob();
        
            formData.append('certificateUploadID', certificateUploadID);
        
            formData.append('qrcode', qrcodeBlob, 'qrcode.png');
        
            const response = await axios.post(`http://localhost:3001/create/${organizationId}`, formData,{
              headers: {
                token: `Bearer ${token}`,
              },
            });
        
            console.log('POST request response:', response.data);
            if (response.status === 200) {
              // Call the notify function here or resolve a promise to notify externally
              notify();
            }          
          } catch (error) {
            console.error('Error sharing certificate:', error);
          }
        };

        const handleShareRequested = async (certificateRequestID, certificateRequestStatus) => {
          try {
            const formData = new FormData();
        
            const qrcodeDataUrl = await QRCode.toDataURL(certificateRequestStatus);
        
            // Log the QR code URL
            console.log('QR code URL:', qrcodeDataUrl);
        
            // Convert the data URL to a Blob
            const qrcodeBlob = await (await fetch(qrcodeDataUrl)).blob();
        
            // Append certificateUploadID as a field
            formData.append('certificateRequestID', certificateRequestID);
        
            // Append the QR code Blob as a file
            formData.append('qrcode', qrcodeBlob, 'qrcode.png');
        
            const response = await axios.post(`http://localhost:3001/create/${organizationId}`, formData,{
              headers: {
                token: `Bearer ${token}`,
              },
            });
        
            console.log('POST request response:', response.data);
        
            // Check if the response indicates success and then notify
            if (response.status === 200) {
              // Call the notify function here or resolve a promise to notify externally
              notify();
            }
          } catch (error) {
            console.error('Error sharing certificate:', error);
          }
        };
        


  return (
    <>
    
    <div className='ModalOverlaySS'>
      
        <div className='ModalContentSS'>
            <div className='ModalWrapperSS'>
                <div className='CloseIconSS'>
<SvgBackIcon style={{ cursor:'pointer' }} onClick={onClose} />
                </div>
                <div  className='ModalFlexBodySS'>
                    <div className='TitleRowSS'>
                        <div>
                            select
                        </div>
                        <div className='ColoredTextSS'>
                        Certificates
                    </div>
                    </div>


{certificateUploads.map((certificateUpload) => (

  <div key={certificateUpload.id} className='CertificatesHolderSS'>
<img
  className='ImageModalSS'
  src={`http://localhost:3001/certificateUploadPhoto/${certificateUpload._id}/photo`}
  alt={`${certificateUpload.id}`}
/>
<div>
{certificateUpload.name}: {certificateUpload.description} 
</div>
<button onClick={() => handleShareUploaded(certificateUpload._id, certificateUpload.status)}><FaShare /></button>

</div>

))}
  
 {certificateRequests.map((certificateRequest) => (

  <div key={certificateRequest.id} className='CertificatesHolderSS'>
<img
  className='ImageModalSS'
  src={`http://localhost:3001/getCertificatePhoto/${certificateRequest.certificateID._id}/photo`}
  alt={`${certificateRequest.certificateID.id}`}
/>
<div>
{certificateRequest.certificateID.name}: {certificateRequest.certificateID.description} 
</div>
<button onClick={() => handleShareRequested(certificateRequest._id, certificateRequest.status)}><FaShare /></button>
</div>

  ))}
  

                </div>

            </div>
        </div>
    </div>
    </>
  )
}

export default Modal