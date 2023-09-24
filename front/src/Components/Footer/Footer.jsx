import React from "react";
import "./Footer.css";
import logo from "../../images/logo2.png";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const location = useLocation();
  const isHomeRoute = location.pathname === "/";
  const isCredentialRoute = location.pathname.startsWith("/credentialUrl");
  const footerClassName = isHomeRoute ? "footer-home" : isCredentialRoute ? "footer-credential" : "";


  
  return (
    <footer className={footerClassName}>
      {/*First section*/}
      <div className="footer-container">
        <div className="footer-container-logo">
          <img src={logo} alt="" />
          <h1>Zidyia Passport</h1>
        </div>
        <p>
          ZIDYIA PASSPORT is a next gen learning management system design
          <br /> to personalize learning, empower teaching and
          <br /> transform education.
        </p>
      </div>
      {/*Second section*/}
      <div className="footer-container">
        <h2>ZIDYIA</h2>
        <p>Services</p>
        <p>About Us</p>
        <p>Our Story</p>
        <p>Partnerships</p>
      </div>
      {/*Third section*/}
      <div className="footer-container">
        <h2>LMS</h2>
        <p>Features</p>
        <p>Products</p>
        <p>Security</p>
        <p>Request Demo</p>
      </div>
      {/*Forth section*/}
      <div className="footer-container">
        <div className="footer-container-sub">
            <h2>Support</h2>
            <p>Contact Us</p>
        </div>
        <div className="footer-container-sub">
        
        <h2>Follow Us</h2>
        <div className="footer-container-social">
          <a
            href="https://www.facebook.com/your-facebook-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} className="facebook-icon" />
          </a>
          <a
            href="https://twitter.com/your-twitter-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} className="twitter-icon" />
          </a>
          <a
            href="https://www.linkedin.com/company/your-linkedin-page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="linkedin-icon" />
          </a>
        </div>
        </div>

        
      </div>
      <div className="footer-bottom">
        <p>© All rights reserved by Zidyia 2023</p>
      </div>
    </footer>
  );
};

export default Footer;
