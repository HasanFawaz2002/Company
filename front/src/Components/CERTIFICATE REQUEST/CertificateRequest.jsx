import React from 'react'
import './CertificateRequest.css'

function CertificateRequest() {
  return (
    <>
    <div className="certificate-request-form-container">
        <div className='Certificate-request-form-container'>
           <h2>Certificate Request Form</h2>
           <form action="">


           <div className="form-group">
          <label htmlFor="">Firstname:</label>
          <input
          
            id="description"
            name="description"
            className="inputDescriptionCU"
          />
        </div>


        <div className='buttonCU'>
        <button type="submit" className="submitButtonCU">
          Request Certificate
        </button>
        </div>
           </form>


        </div>
    </div>
        </>
  )
}

export default CertificateRequest