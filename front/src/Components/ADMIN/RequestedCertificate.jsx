import React, { useEffect, useState } from 'react';
import './RequestedCertificate.css';
import image from '../../images/image1.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CirclesWithBar } from 'react-loader-spinner';


function RequestedCertificate(props) { 
  const [certificateRequests, setCertificateRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  useEffect(() => {
    const status = props.selectedStatus; // Use props.selectedStatus to get the selected status

    axios
      .get(`http://localhost:3001/getCertificateRequestsByStatusAndInstitution/${status}`, {
        headers: {
          token: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCertificateRequests(response.data);
        setIsLoading(false); 

      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          console.log('Token is not valid!');
          navigate('/Institutionlogin');
        } else {
          console.error('Error Fetching Data:', error);
        }
      });
  }, [props.selectedStatus]); 

  if (isLoading) {
    return <div className='loading'><CirclesWithBar
    height="100"
    width="100"
    color="rgb(70, 241, 207)"
    wrapperStyle={{}}
    wrapperClass=""
    visible={true}
    outerCircleColor=""
    innerCircleColor=""
    barColor=""
    ariaLabel='circles-with-bar-loading'
    /></div>;
  }

  return (
    <>
      <div className="requested-certificate-container">
        {certificateRequests.map((item, index) => (
          <div class="requested-ceritificate-card" key={index}>
            <div className="img-box">
              <img src={`http://localhost:3001/getCertificatePhoto/${item.certificateID._id}/photo`} alt={`${item.certificateID.id}`} />
            </div>
            <div class="content">
              <h3>{item.certificateID.name}</h3>
              <div className="list">
                <li>
                  <strong>_Requested By:</strong> {item.studentID.username}
                </li>
                <li>
                  <strong>_Student email:</strong> {item.studentID.email}
                </li>
                <li>
                  <strong>_Status:</strong>
                  <span className={getStatusColorClass(item.status)}>{item.status}</span>
                </li>
              </div>
              <button className="first-button">Approve</button>
              <button className="second-button">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  // Function to get the appropriate class for the status
  function getStatusColorClass(status) {
    switch (status) {
      case 'Pending':
        return 'blue-text';
      case 'Rejected':
        return 'red-text';
      case 'Approved':
        return 'green-text';
      default:
        return '';
    }
  }
}

export default RequestedCertificate;
