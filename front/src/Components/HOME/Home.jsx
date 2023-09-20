import React,{useEffect,useState} from "react";
import './Home.css';
import Footer from "../Footer/Footer";
import Image1 from '../../images/image1.png';
import Image2 from '../../images/certificateImage.jpg';
import Image3 from '../../images/meeting.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    const registerNavigate = () => {
        navigate('/register');
    }
    return(
        <>
        <div className="landpage">
            <div className="box1"></div>
            <div className="box2">
                <div className="landpage-text">
                Discover <br/> <span>Credentials</span>
                </div>
                <div className="landpage-subheading">
                    <h2>Explore Our Services</h2>
                </div>
                <div className="landpage-btn-container">
                <button onClick={registerNavigate}>Get Started</button>
                </div>
            </div>
        </div>


        <div className="first-aboutus-section ">
            <h3>The Power of Zidyia Passport</h3>
            <h1>A next gen Certificate management system</h1>
            <div className="aboutus-section-content">
                <img src={Image1} alt="" />
                <div className="aboutus-section-content-right">
                    <h1>Simple</h1>
                    <p>Zidyia Passport provides an easy to use platform with the best user experience</p>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Engaging course content composed of quizzes and grades.
                        </li>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Data and insights to analyze integration with course content.
                        </li>
                </div>
            </div>
        </div>

        <div className="aboutus-section2">
                
                <div className="aboutus-section-content2">
                    <div className="aboutus-section-content2-left">
                        <h1>Secure</h1>
                        <p>We prioritize the security of your certificates and data.</p>
                            <li>
                                <FontAwesomeIcon icon={faCheck} />
                                Robust encryption to protect sensitive information.
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck} />
                                Regular security audits to ensure your data's safety.
                            </li>
                    </div>
                    <img src={Image3} alt="" />
                </div>
            </div>

            <div className="aboutus-section">
                
                <div className="aboutus-section-content">
                    <img src={Image2} alt="" />
                    <div className="aboutus-section-content-right">
                        <h1>Efficient</h1>
                        <p>Zidyia Passport streamlines your certificate management process.</p>
                            <li>
                                <FontAwesomeIcon icon={faCheck} />
                                Time-saving features for quick certificate generation.
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCheck} />
                                Simplified workflows to enhance productivity.
                            </li>
                    </div>
                </div>
            </div>


        <Footer />
        
        </>
    )
}

export default Home;
