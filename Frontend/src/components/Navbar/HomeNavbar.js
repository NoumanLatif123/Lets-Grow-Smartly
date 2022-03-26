import React from 'react'
import Navbar from './Navbar';
import * as FiIcons from "react-icons/fi";
import {IconContext} from 'react-icons';
import '../Navbar/Navbar.css';

function HomeNavbar() {

    function logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.open('/', '_self');
    }

    return (
        <>
            {/* <Navbar/> */}
            <IconContext.Provider value={{size: 15, color: '#fff'}}>
                <div className='logout-button'>
                <button className='btn' onClick={logout}>
                    <FiIcons.FiLogOut className='fas-logout'/>
                    <p>Logout</p>
                </button>
                </div>
            </IconContext.Provider>
        </>
    )
}

export default HomeNavbar
