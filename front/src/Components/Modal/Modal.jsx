import React, { useEffect, useState } from 'react'
import './Modal.css';
import axios from 'axios';
import { ReactComponent as SvgBackIcon } from '../../images/icons/Arrow.svg';

const Modal = ({onClose, onSave}) => {
    const [certificateUploads, setCertificateUploads]= useState([]);
    const [certificateRequests, setCertificateRequests]= useState([]);
    const [checkedCertificates, setCheckedCertificates] = useState({});

    const toggleCheckbox = (certificateId) => {
        setCheckedCertificates((prevCheckedCertificates) => ({
          ...prevCheckedCertificates,
          [certificateId]: !prevCheckedCertificates[certificateId],
        }));
      };
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
                   
                    <div>
 {certificateUploads.map((certificateUpload) => (

<label className={`CertificatesHolderSS ${
                    checkedCertificates[certificateUpload.id] ? 'CustomBorderColor' : ''
                  }`} key={certificateUpload.id}>
<input type='checkbox' className='HiddenCheckbox' checked={checkedCertificates[certificateUpload.id] || false}
                    onChange={() => toggleCheckbox(certificateUpload.id)} />
<img
  className='ImageModalSS'
  src={`http://localhost:3001/certificateUploadPhoto/${certificateUpload._id}/photo`}
  alt={`${certificateUpload.id}`}
/>
{certificateUpload.name}: {certificateUpload.description}
</label>
  ))}
</div>
                    <div>
 {certificateRequests.map((certificateRequest) => (

<label className={`CertificatesHolderSS ${
                    checkedCertificates[certificateRequest.id] ? 'CustomBorderColor' : ''}`} key={certificateRequest.id}>
<input type='checkbox' className='HiddenCheckbox'  checked={checkedCertificates[certificateRequest.id] || false}
                    onChange={() => toggleCheckbox(certificateRequest.id)} />
<img
  className='ImageModalSS'
  src={`http://localhost:3001/getCertificatePhoto/${certificateRequest.certificateID._id}/photo`}
  alt={`${certificateRequest.certificateID.id}`}
/>
{certificateRequest.certificateID.name}: {certificateRequest.certificateID.description}
</label>
  ))}
  <div className='ButtonsRowSS' >
<button className='ButtonsSS'>Send</button>

  </div>
</div>

                </div>

            </div>
        </div>
    </div>
  )
}

export default Modal