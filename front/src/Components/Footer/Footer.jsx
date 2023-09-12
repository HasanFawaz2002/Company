import React from 'react'
import './Footer.css';
import logo from '../../images/logo2.png';

const Footer = () => {
  return (
    <footer>
        {/*First section*/ }
        <div className="footer-container">
            <div className="footer-container-logo">
                <img src={logo} alt="" />
                <h1>Zidyia</h1>
            </div>
            <p>
            ZIDYIA is a next gen learning management system design<br/> to personalize learning, empower teaching and<br/> transform education.
            </p>
        </div>
        {/*Second section*/ }
        <div className="footer-container">
            <h2>ZIDYIA</h2>
                <p>Services</p>
                <p>About Us</p>
                <p>Our Story</p>
                <p>Partnerships</p>
        </div>
        {/*Third section*/ }
        <div className="footer-container">
        <h2>LMS</h2>
                <p>Features</p>
                <p>Products</p>
                <p>Security</p>
                <p>Request Demo</p>
        </div>
        {/*Forth section*/ }
        <div className="footer-container">
            <h2>Support</h2>
            <p>Contact Us</p>
            <h2>Follow Us</h2>
            <div className="footer-container-social">
                <p>FC</p>
                <p>TW</p>
                <p>LI</p>
            </div>
        </div>
        <div className="footer-bottom">
        <p>© All rights reserved by Zidyia 2023</p>
        </div>
    </footer>
  )
}

export default Footer