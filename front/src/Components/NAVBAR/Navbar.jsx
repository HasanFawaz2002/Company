import React,{useState} from "react";
import './Navbar.css';
import { NavLink,useLocation,useNavigate, useRoutes  } from "react-router-dom";
import logo from '../../images/logo.png';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    console.log(location.pathname);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isInstitutionsRoute = location.pathname.startsWith('/institutions') || location.pathname.startsWith('/Institutionlogin') || location.pathname.startsWith('/CertificateUpload') || location.pathname === "/StudentViewSubs" || location.pathname.startsWith('/CertificateRequest') || location.pathname.startsWith('/login'); 
  const isInstitutionLogin = location.pathname.startsWith('/Institutionlogin') || location.pathname.startsWith('/CertificateUpload') || location.pathname.startsWith('/CertificateRequest') || location.pathname === "/StudentViewSubs" || location.pathname.startsWith('/login');
    return (
        <>
        <div className={`box3 ${isInstitutionsRoute ? 'institution-route' : ''}`}>
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="" />
                <h1 className={isInstitutionLogin ? 'white-link' : ''}>Zidyia</h1>
            </div>
            <div className="navbar-menu">
                <ul >
                    <li ><NavLink  className={isInstitutionsRoute ? 'white-link' : ''} to='/'>HOME</NavLink></li>
                    <li><NavLink className={isInstitutionsRoute ? 'white-link' : ''} to='/admin'>Dashboard</NavLink></li>
                    <li><NavLink className={isInstitutionsRoute ? 'white-link' : ''} to='/contact'>CONTACT</NavLink></li>
                    <li><NavLink className={isInstitutionsRoute ? 'white-link' : ''} to='/institutions'>Institutions</NavLink></li>
                </ul>
            </div>
        </div>
        </div>

        <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`}>
      <input
        id="menu__toggle"
        type="checkbox"
        checked={menuOpen}
        onChange={toggleMenu}
      />
      <label className="menu__btn" htmlFor="menu__toggle">
        <span></span>
      </label>

      <ul className="menu__box">
        <li>
          <NavLink to="/" className="menu__item" onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="menu__item" onClick={closeMenu}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="menu__item" onClick={closeMenu}>
            Team
          </NavLink>
        </li>
        <li>
          <NavLink className="menu__item" onClick={closeMenu}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink className="menu__item" onClick={closeMenu}>
            Twitter
          </NavLink>
        </li>
      </ul>
    </div>
        </>
    )
}
export default Navbar;