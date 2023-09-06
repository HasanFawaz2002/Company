import React from "react";
import './Home.css';

const Home = () => {
    return(
        <>
        <div className="landpage">
            <div className="box1"></div>
            <div className="box2">
                <div className="text">
                Discover <br/> Credentials
                </div>
                <div className="landpage-btn-container">
                <button>Get Started</button>
                <button>Help</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
