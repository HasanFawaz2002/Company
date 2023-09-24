import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './VerificationPlatformShared.css'
import axios from 'axios';

const VerificationPlatformShared = () => {
  const[sharedCertificates, setSharedCertificates] = useState([]);
  const [filterInput, setFilterInput] = useState('');


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  };
  const token = localStorage.getItem("access_token");
  const role = localStorage.getItem("role");
const subscriberID = localStorage.getItem("userId");
console.log(subscriberID);


  useEffect(() => {

    axios
    .get(`http://localhost:3001/getSharedCertificateBySubscriber/${subscriberID}`,{
      headers: {
        token: `Bearer ${token}`,
      },
    
    })
    
    .then((response) => {
      // Update the institutions state with the fetched data
      setSharedCertificates(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      console.error("Error fetching certificates:", error);
      // Handle the error, e.g., set institutions to an empty array
      setSharedCertificates([]);
    });
    
    }, []);  
  


    
  return (
    <div className='BackgroundVP'>
      <div className='AboveTableHolder'>
          <div className='TitlesWithSearch'>
              <div className='TitlesWrapper'>
                    <h2>Verified Certificates</h2>
                    <input className='inputSS'
            type='text'
              onChange={(e) => setFilterInput(e.target.value)}
              placeholder='Search for verifications...'
            />
              </div>
          </div>
     </div>
      <div className='TableSection'>
      <div className='StudentNameSectionHolder'>
        {/* Students */}
         <div className='StudentNameSection'>
         {sharedCertificates
      .filter((sharedCertificate) => {
        // Filter by student name, certificate name, and date
        const studentName =
          sharedCertificate.certificateUploadID?.studentID?.username ||
          sharedCertificate.certificateRequestID?.studentID?.username;
        const certificateName =
          sharedCertificate.certificateUploadID?.certificateID?.name ||
          sharedCertificate.certificateRequestID?.certificateID?.name;
        const formattedDate = formatDate(sharedCertificate.createdAt);

                return (
                  (filterInput.trim() === '' ||
        studentName?.toLowerCase().includes(filterInput.toLowerCase()) ||
        certificateName?.toLowerCase().includes(filterInput.toLowerCase()) ||
        formattedDate.toLowerCase().includes(filterInput.toLowerCase()))
    );
  }).map((sharedCertificate) => (
            <div key={sharedCertificate._id}>
              {(sharedCertificate.certificateUploadID || sharedCertificate.certificateRequestID) && (
                <div className='MainHolderVP'>
                  <div className='NameSectionWrapperVP'>
                    <h2 className='StudentNameVP'>
                      {sharedCertificate.certificateUploadID?.studentID?.username || sharedCertificate.certificateRequestID?.studentID?.username}
                      </h2>
                    <div className='SectionsWrapperVP'>
                      <div className='InfoDivsVP'>
                    <p style={{ color:"#5DD3B3" }}> Certified in </p>
                      {sharedCertificate.certificateUploadID?.certificateID?.name || sharedCertificate.certificateRequestID?.certificateID?.name}
                      </div>
                      <div className='InfoDivsVP'>

                      <p style={{ color:"#5DD3B3" }}> Verified by </p>
                      {sharedCertificate.certificateUploadID?.institutionID?.name || sharedCertificate.certificateRequestID?.institutionID?.name}
                      </div>
                      <div className='InfoDivsVP'>

                      <p style={{ color:"#5DD3B3" }}> Shared on </p>
                      {formatDate(sharedCertificate.createdAt)}
                      </div>
                      <div className='InfoDivsVP'>
                      {sharedCertificate.certificateUploadID ? (
                        
  <img className='ImgStylingCU2' src={`http://localhost:3001/photo/6510288fca52bfcfbdbf41be`} alt="Certificate Upload" />
) : sharedCertificate.certificateRequestID ? (
  <img className='ImgStylingCU2' src={`http://localhost:3001/photo/${sharedCertificate._id}`} alt="Certificate Request" />
) : null} 
<a
        href={`http://localhost:3001/photo/${sharedCertificate._id}`}
        download 
        target="_blank"
        rel="noopener noreferrer"
      >
        <button>Download qr file</button>
      </a>
                      {/* {formatDate(sharedCertificate.createdAt)} */}
                      </div>

                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
         </div>
     </div>
     </div>
    </div>
  )
}

export default VerificationPlatformShared