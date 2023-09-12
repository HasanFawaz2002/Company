import React from "react";
import './Home.css';
import Footer from "../Footer/Footer";

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
        </>
    )
}

export default Home;
