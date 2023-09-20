import React ,{ useState,useEffect } from 'react'
import axios from "axios"
import './UserCertificate.css';




function UserCertificate(){
    const [uploadedcertificates, setuploadedCertificates] = useState([]);
    const [requestedcertificates, setrequestedCertificates] = useState([]);
    const api= "http://localhost:3001";
    const token = localStorage.getItem('access_token');

    useEffect(() => {
    
        const fetchallCertificates = async () => {
          try {
            const response = await axios.get(`${api}/getcertificaterequestoruploaded`,
            {
              headers: {
                token: `Bearer ${token}`,
              },
          }
            ); // Replace with your API endpoint
            setuploadedCertificates(response.data.uploadedCertificates);
            setrequestedCertificates(response.data.requestedCertificates);
            console.log(response.data.uploadedCertificates);
          } catch (error) {
            console.error('Error fetching certificates:', error);
          }
        };
    
        fetchallCertificates();
      }, []);

    return(
        <>
       <section className='UserCertificate-container'>
       {uploadedcertificates.map((uploadedcertificate) => (
        <div className='UserCertificate-card'>
            <div className='UserCertificate-card-image'>

            </div>
            <p className='UserCertificate-card-headtwo'>Name:</p>
            <p className='UserCertificate-card-firstp'>Description:{uploadedcertificate.description}</p>
            <p className='UserCertificate-card-firstp'>Status:{uploadedcertificate.status}</p>
            <div className='UserCertificatebtn'>
               <button className='UserCertificate-cancel'>Cancel</button>
            </div>
          
        </div>
      ))}   
      
        </section>
        
        </>
    )
}

export default UserCertificate;

