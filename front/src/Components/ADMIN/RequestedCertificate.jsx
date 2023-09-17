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
  const [firstshowModal, firstsetShowModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [rejectReasonRequired, setRejectReasonRequired] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCertificateId, setSelectedCertificateId] = useState(null);
  const api= "http://localhost:3001";


  useEffect(() => {
    const status = props.selectedStatus;

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

  const openModal = () => {
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  const firstopenModal = () => {
    firstsetShowModal(true);
  };

  // Function to close the modal
  const firstcloseModal = () => {
    firstsetShowModal(false);
  };

  const acceptCertificate = async (certificateId) => {
    try {
      // Make a PUT request to update the certificate status
      const response = await axios.put(
        `${api}/updateCertificateStatusToVerified/${certificateId}`,
        {},
        {
          headers: {
            token: `Bearer ${token}`,
          },
      }
      );
      if (response.status === 200) {
        // If the request was successful (status code 200), refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error accepting certificate:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  const rejectCertificate = async (certificateId, reason) => {
    try {
      // Make a PUT request to update the certificate status with a reason
      const response = await axios.put(
        `${api}/updateCertificateStatusToRejected/${certificateId}`,
        { reason }, // Pass the reason in the request body
        {
          headers: {
            token: `Bearer ${token}`,
          },
      }
      );
  
      if (response.status === 200) {
        // If the request was successful (status code 200), refresh the page
        window.location.reload();
      }
    } catch (error) {
      console.error('Error rejecting certificate:', error);
      // Handle the error (e.g., show an error message to the user)
    }
  };

  if (isLoading) {
    return (
      <div className='loading'>
        <CirclesWithBar
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
        />
      </div>
    );
  }

  return (
    <>
      {certificateRequests.length === 0 ? (
        <div className="no-requests-message">No requests found.</div>
      ) : (
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
                <button className={`first-button ${item.status === 'Approved' || item.status === 'Rejected' ? 'disabled' : ''}`}onClick={() => {
    setSelectedCertificateId(item._id);
    firstopenModal();
  }}
  disabled={item.status === 'Approved' || item.status === 'Rejected'}
  >Approve</button>
                <button className={`second-button ${item.status === 'Approved' || item.status === 'Rejected' ? 'disabled' : ''}`}onClick={() => {
    setSelectedCertificateId(item._id);
    openModal();
  }}
  disabled={item.status === 'Approved' || item.status === 'Rejected'}
  >Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}

{firstshowModal && (
        <div className="modal">
          <span className="close" title="Close Modal" onClick={firstcloseModal}>
            x
          </span>
          <form className="modal-content">
            <div className="container">
              <h1>Accept Certificate</h1>
              <p>Are you sure you want to accept this certificate?</p>

              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={firstcloseModal}>
                  Cancel
                </button>
                <button type="button" className="acceptbtn"   onClick={() => {
        if (selectedCertificateId) {
          acceptCertificate(selectedCertificateId);
        }
        firstcloseModal();
      }}>
                  Accept
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {showModal && (
        <div className="modal">
          <span className="close" title="Close Modal" onClick={closeModal}>
            x
          </span>
          <form className="modal-content">
            <div className="container">
              <h1>Reject Certificate</h1>
              <p>Are you sure you want to reject this certificate?</p>
              <textarea placeholder='reason' className='reject-textarea'  value={rejectReason}
          onChange={(e) => setRejectReason(e.target.value)}/>
{rejectReasonRequired && (
  <div className="error-message">The reason is required.</div>
)}
              <div className="clearfix">
                <button type="button" className="cancelbtn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="deletebtn"  onClick={() => {
              if (rejectReason) {
                rejectCertificate(selectedCertificateId, rejectReason);
                closeModal();
              }else {
                // Show the "reason is required" message
                setRejectReasonRequired(true);
              }
             
            }}>
                  Reject
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

    </>
  );

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
