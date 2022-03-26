import React, { useState } from "react";
import { Link } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";
//import * as FiIcons from "react-icons/fi";
//import { IconContext } from 'react-icons';
import '../Navbar/Navbar.css';

function NavbarDashboard () {
    const [isMobile, setIsMobile] = useState(false);
  
    return (
        <>
        <nav className="navbardashboard">
            <div className="brand-title">
                <Link to="/">
                    <img src="assets/pictures/logo.png" alt="" />
                    <span>LET'S GROW SMARTLY</span>
                </Link>
                <div className="toggle-button1" onClick={() => setIsMobile(!isMobile)}>
                    {isMobile ? (
                    <FaIcons.FaTimes />
                    ) : (
                    <FaIcons.FaBars />
                    )}
                </div>
            </div>
            <div className={isMobile? "navbar-links-mobile" : "navbar-links2"}
            onClick={() => setIsMobile(false)}>
                <ul>
                    <li><Link to="/" className='cool-link'>Home</Link></li>
                    <li><Link to="./search" className='cool-link1'>Child Specialists</Link></li>
                 {/*   <li><Link to="./dashboard" className='cool-link1'>Dashboard</Link></li> */}
                    <li><Link to="./book-appointments" className='cool-link1'>Book Appointments</Link></li>
                    <li><Link to="./community-garage" className='cool-link1'>Community Garage</Link></li>
                </ul>
            </div>
        </nav>
        </>
    )
}

export default NavbarDashboard