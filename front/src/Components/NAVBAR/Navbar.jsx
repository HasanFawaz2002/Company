import React,{useState} from "react";
import './Navbar.css';
import { NavLink,useLocation,useNavigate  } from "react-router-dom";


const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                LOGO
            </div>
            <div className="navbar-menu">
                <ul>
                    <li><NavLink to='/'>HOME</NavLink></li>
                    <li><NavLink to='/services'>SERVICES</NavLink></li>
                    <li><NavLink to='/about'>ABOUT</NavLink></li>
                    <li><NavLink to='/contact'>CONTACT</NavLink></li>
                    <li><NavLink to='/help'>HELP</NavLink></li>
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