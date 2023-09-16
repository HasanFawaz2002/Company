import React from 'react'
import './RequestedCertificate.css';
import image from '../../images/image1.png'

function RequestedCertificate() {
  return (
    <>
    <div className='requested-certificate-container'>
        <div class="requested-ceritificate-card" >
                <div className="img-box">
                    <img src={image}/>
                </div>
                <div class="content">
                    <h2>Certificate name</h2>
                    <div className="list">
                    
                    <li>
                        <strong>_Requested By:</strong> Hasan
                    </li>
                    <li>
                       <strong>_Student email:</strong> hasan.f2002@gmail.com
                    </li>
                    <li>
                       <strong>_Status:</strong><span>Accepted</span>
                    </li>
                    </div>
                    
                    <button className='first-button'>Read More</button>
                    <button className='second-button'>Read More</button>
                </div>
            </div>
            <div class="requested-ceritificate-card" >
                <div className="img-box">
                    <img src={image}/>
                </div>
                <div class="content">
                    <h2>Certificate name</h2>
                    <div className="list">
                    
                    <li>
                        <strong>_Requested By:</strong> Hasan
                    </li>
                    <li>
                       <strong>_Student email:</strong> hasan.f2002@gmail.com
                    </li>
                    <li>
                       <strong>_Status:</strong><span>Accepted</span>
                    </li>
                    </div>
                    
                    <button className='first-button'>Read More</button>
                    <button className='second-button'>Read More</button>
                </div>
            </div>
            <div class="requested-ceritificate-card" >
                <div className="img-box">
                    <img src={image}/>
                </div>
                <div class="content">
                    <h2>Certificate name</h2>
                    <div className="list">
                    
                    <li>
                        <strong>_Requested By:</strong> Hasan
                    </li>
                    <li>
                       <strong>_Student email:</strong> hasan.f2002@gmail.com
                    </li>
                    <li>
                       <strong>_Status:</strong><span>Accepted</span>
                    </li>
                    </div>
                    
                    <button className='first-button'>Read More</button>
                    <button className='second-button'>Read More</button>
                </div>
            </div>
            
           
            
           
            
            
            
    </div>
    </>
  )
}

export default RequestedCertificate