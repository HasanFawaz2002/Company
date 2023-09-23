import React, { useState, useEffect } from 'react';
import axios from "axios";
import './MyProfile.css';
import profilepic from  "../../images/peopleprofile.jpg";
import {PiCertificate} from "react-icons/pi";
import {LiaCertificateSolid} from "react-icons/lia";
import {FaShareFromSquare} from "react-icons/fa6";

function MyProfile(){
    const api = 'http://localhost:3001';
    const token = localStorage.getItem('access_token');
    const userID = localStorage.getItem('userId');

    const [userData, setUserData] = useState({
        username: '',
        bio: '',
        email: '',
        profilePicture:''
      });
    
      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await axios.get(`${api}/user/find/${userID}`,
            {
                headers: {
                  token: `Bearer ${token}`,
                },
              }); 
            const { username, bio, email,profilePicture } = response.data;
            console.log(response.data)
            setUserData({ username, bio, email,profilePicture });
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
        fetchUserData();
      }, []);


    return(
        <>
        <div className='MyProfile-parent'>
            <div className='MyProfile-container'>
                <div className='MyProfile-image'>
                    <img src={`${api}/getUserPhoto/${userID}/photo`} alt="pic" className='circle-pic' />
                </div>
                <div className='MyProfile-headers'>
                   <h2><span className='colorspan'>Name:</span>  {userData.username}</h2>
                   <h3><span className='colorspan'>Bio:</span>  {userData.bio}</h3>
                   <h3><span className='colorspan'>Email:</span> {userData.email}</h3>
                </div>
                <div className='certificatestatistic-content'>
                    <div className='firstcertificatestatistic'>
                        <h3>Uploaded Certificate:</h3> 
                        <PiCertificate className='myprofileicon'/> 
                        <span> 15</span>
                    </div>
                    <div className='secondcertificatestatistic'>
                        <h3>Requested Certificate:</h3> 
                        <LiaCertificateSolid  className='myprofileicon'/>
                        <span> 15</span>
                    </div>
                    <div className='thirdcertificatestatistic'>
                        <h3>Shared Certificate:</h3> 
                        <FaShareFromSquare  className='myprofileicon'/> 
                        <span> 15</span>
                    </div>
                </div>
                <botton className="MyProfile-edit">Edit Profile</botton>
                
            </div>
        </div>
        </>
    )
}

export default MyProfile;