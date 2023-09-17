import React,{useState} from "react";
import './Navbar.css';
import { NavLink,useLocation,useNavigate  } from "react-router-dom";
import logo from '../../images/logo.png';

const Navbar = () => {
  const location = useLocation();

    const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isInstitutionsRoute = location.pathname.startsWith('/institutions'); // Check if the current route starts with '/admin'

    return (
        <>
        <div className={`box3 ${isInstitutionsRoute ? 'institution-route' : ''}`}>
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="" />
                <h1>Zidyia</h1>
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