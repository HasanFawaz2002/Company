import React,{useEffect,useState} from "react";
import './Home.css';
import Footer from "../Footer/Footer";
import Image1 from '../../images/image1.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
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
                <button>Get Started</button>
                </div>
            </div>
        </div>


        <div className="aboutus-section">
            <h3>The Power of Zidyia Passport</h3>
            <h1>A next gen Certificate management system</h1>
            <div className="aboutus-section-content">
                <img src={Image1} alt="" />
                <div className="aboutus-section-content-right">
                    <h1>Simple</h1>
                    <p>Zidyia provides an easy to use platform with the best user experience</p>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Engaging course content composed of quizzes and grades.
                        </li>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Data and insights to analyze integration with course content.
                        </li>
                </div>
            </div>
        </div>

        <div className="aboutus-section">
           
            <div className="aboutus-section-content2">
                <div className="aboutus-section-content2-left">
                    <h1>Simple</h1>
                    <p>Zidyia provides an easy to use platform with the best user experience</p>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Engaging course content composed of quizzes and grades.
                        </li>
                        <li><FontAwesomeIcon icon={faCheck}  />
                            Data and insights to analyze integration with course content.
                        </li>
                </div>
                <img src={Image1} alt="" />

            </div>
        </div>

        
        </>
    )
}

export default Home;
