import React,{useState} from "react";
import './Navbar.css';
import { NavLink,useLocation,useNavigate, useRoutes  } from "react-router-dom";
import logo from '../../images/logo.png';

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    console.log(location.pathname);
  let navbarColor;
  if (location.pathname === '/CertificateUpload') {
    navbarColor = '#fff';
  }
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
    return (
        <>
        <div className="box3">
        <div className="navbar">
            <div className="navbar-logo">
                <img src={logo} alt="" />
                <h1 style={{ color: navbarColor }}>Zidyia</h1>
            </div>
            <div className="navbar-menu">
                <ul>
                    <li><NavLink style={{ color: navbarColor }} to='/'>HOME</NavLink></li>
                    <li><NavLink style={{ color: navbarColor }} to='/about'>ABOUT</NavLink></li>
                    <li><NavLink style={{ color: navbarColor }} to='/contact'>CONTACT</NavLink></li>
                    <li><NavLink style={{ color: navbarColor }} to='/help'>HELP</NavLink></li>
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