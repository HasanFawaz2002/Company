import React from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";
import Home from "./Components/HOME/Home";
import Navbar from "./Components/NAVBAR/Navbar";
import About from "./Components/ABOUT/About";
import Institutionlogin from "./Components/InstitutionLogin/Institutionlogin";
import Register from "./Components/Authentication/Register";
import LogintoZidyia from "./Components/Authentication/Login";
import ForgotPassword from "./Components/Authentication/forgotpassword";
import Resetpassword from "./Components/Authentication/Resetpassword";
import EmailVerify from "./Components/Authentication/EmailVerify";
import EmailSent from "./Components/Authentication/EmailSent";
import AdminDashboard from "./Components/ADMIN/AdminDashboard";
import CertificateUpload from "./Components/CertificateUpload/CertificateUpload";
import CompleteInformation from "./Components/CompleteInformation/CompleteInformation";
import UserCertificate from "./Components/UserCertificate/UserCertificate";
import CertificateRequest from "./Components/CERTIFICATE REQUEST/CertificateRequest";
import StudentViewSubs from "./Components/StudentViewSubs/StudentViewSubs";
import AllInstitutions from "./Components/AllINSTITUTIONS/AllInstitutions";
import Institutions from "./Components/INSTITUTIONS/Institutions";
import Contactus from "./Components/Contactus/Contactus";
import SuperAdminDashboard from "./Components/SUPERADMIN/SuperAdminDashboard";
import VerificationPlatformShared from "./Components/verificationPlatformShared/VerificationPlatformShared";
import MyProfile from "./Components/MyProfile/MyProfile";
import SubscriptionLogin from "./Components/LOGINSUBSCRIPTION/SubscriptionLogin";
import CredentialUrl from './Components/credentialUrl/CredentialUrl';
import Expiry from "./Components/EXPIRYLICENSE/Expiry";
const App = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/EmailSent", "/users", "/admin", "/superadmin"];

  const isNavbarHidden = hideNavbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );
    return (
        <>
        {!isNavbarHidden && <Navbar />} 
        <Routes>
            <Route path="https://zidyia-passport.netlify.app" element={<Home/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/about" element={<About/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/Contact" element={<Contactus/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/Institutionlogin" element={<Institutionlogin/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/Register" element={<Register/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/login" element={<LogintoZidyia/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/forgot-password" element={<ForgotPassword />}></Route>
            <Route path="https://zidyia-passport.netlify.app/reset_password/:id/:token" element={<Resetpassword />}></Route>
            <Route path="https://zidyia-passport.netlify.app/users/:id/verify/:token" element={<EmailVerify/>}></Route>
            <Route path="https://zidyia-passport.netlify.app/EmailSent/:email" element={<EmailSent />}></Route>
            <Route path="https://zidyia-passport.netlify.app/admin/*" element={<AdminDashboard />} />
            <Route path="https://zidyia-passport.netlify.app/institutions" element={<Institutions />}></Route>
            <Route path="https://zidyia-passport.netlify.app/CertificateUpload" element={<CertificateUpload />} />
            <Route path="https://zidyia-passport.netlify.app/CompleteInformation" element={<CompleteInformation />} />
            <Route path="https://zidyia-passport.netlify.app/UserCertificate" element={<UserCertificate />} />
            <Route path="https://zidyia-passport.netlify.app/CertificateUpload/:institutionID?" element={<CertificateUpload />} />
            <Route path="https://zidyia-passport.netlify.app/CertificateRequest/:institutionID" element={<CertificateRequest />}></Route>
            <Route path="https://zidyia-passport.netlify.app/StudentViewSubs" element={<StudentViewSubs />} />
            <Route path="https://zidyia-passport.netlify.app/AllInstitutions" element={<AllInstitutions />}></Route>
            <Route path="https://zidyia-passport.netlify.app/superadmin/*" element={<SuperAdminDashboard />}></Route>
            <Route path="https://zidyia-passport.netlify.app/VerificationPlatformShared" element={<VerificationPlatformShared />}></Route>
            <Route path="https://zidyia-passport.netlify.app/MyProfile" element={<MyProfile />}></Route>
            <Route path="https://zidyia-passport.netlify.app/SubscriptionLogin" element={<SubscriptionLogin />}></Route>
            <Route path="https://zidyia-passport.netlify.app/CredentialUrl/:sharedCertificateID" element={<CredentialUrl />}></Route>
            <Route path="https://zidyia-passport.netlify.app/expiryLicense" element={<Expiry />}></Route>
          </Routes>
        </>
    )
}

export default App;
