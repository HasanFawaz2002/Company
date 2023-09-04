import React from "react";
import {Routes,Route,Outlet} from 'react-router-dom'
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import About from "./Components/ABOUT/About";


const App = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
        </Routes>
        </>
    )
}

export default App;