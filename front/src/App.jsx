import React from "react";
import {Routes,Route,Outlet} from 'react-router-dom'
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import About from "./Components/ABOUT/About";
import Institutionlogin from "./Components/InstitutionLogin/Institutionlogin";
import InstituteHome from "./Components/InstitutionLogin/InstituteHome";


const App = () => {
    return (
        <>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/Institutionlogin" element={<Institutionlogin/>}></Route>
            <Route path="/InstituteHome" element={<InstituteHome/>}></Route>

        </Routes>
        </>
    )
}

export default App;