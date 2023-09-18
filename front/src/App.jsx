import React from "react";
import {Routes,Route,Outlet,useLocation } from 'react-router-dom'
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import About from "./Components/ABOUT/About";
import Institutionlogin from "./Components/InstitutionLogin/Institutionlogin";
import InstituteHome from "./Components/InstitutionLogin/InstituteHome";
import Register from "./Components/Authentication/Register"
import LogintoZidyia from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/forgotpassword";
import Resetpassword from "./Components/Authentication/Resetpassword";
import EmailVerify from "./Components/Authentication/EmailVerify";
import EmailSent from "./Components/Authentication/EmailSent";
import AdminDashboard from "./Components/ADMIN/AdminDashboard";
import CertificateUpload from "./Components/CertificateUpload/CertificateUpload";



const App = () => {
    const location = useLocation();
  const hideNavbarRoutes = ["/EmailSent", "/users","/admin"]; 

  const isNavbarHidden = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
    return (
        <>
        {!isNavbarHidden && <Navbar />} 
        <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/Institutionlogin" element={<Institutionlogin/>}></Route>
            <Route path="/InstituteHome" element={<InstituteHome/>}></Route>
            <Route path="/Register" element={<Register/>}></Route>
            <Route path="/login" element={<LogintoZidyia/>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="/reset_password/:id/:token" element={<Resetpassword />}></Route>
            <Route path="/users/:id/verify/:token" element={<EmailVerify/>}></Route>
            <Route path="/EmailSent/:email" element={<EmailSent />}></Route>
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/CertificateUpload" element={<CertificateUpload />} />
          </Routes>
        </>
    )
}

export default App;