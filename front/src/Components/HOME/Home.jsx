import React from "react";
import './Home.css';
import { Button } from "../Styles/Button";

const Home = () => {
    return(
        <>
        <div className="landpage">
            <div className="box1"></div>
            <div className="box2">
                <div className="landpage-text">
                Discover <br/> <span>Credentials</span>
                </div>
                <div className="landpage-btn-container">
                <Button>Get Started</Button>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;
