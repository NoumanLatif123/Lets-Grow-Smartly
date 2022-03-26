import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import * as FaIcons from "react-icons/fa";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { IconContext } from "react-icons";
import "../Sidebar/Sidebar.css";
import Navbar from "../Navbar/Navbar";

function Sidebar({ setOptions }) {
  const [sidebar, setSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    sidebar ? setSidebar(false) : setSidebar(true);
  };

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.open("/", "_self");
  }

  return (
    <>
      <nav className={sidebar ? "navbardashboard" : "navbardashboard1"}>
        <Navbar />
      </nav>

      <div
        className={
          sidebar ? "lower-navbar-dashboard" : "lower-navbar-dashboard1"
        }
        onClick={() => setSidebar(false)}
      >
        <h5>Manage Appointments</h5>
        <h6>View appointments with respective Child Specialists</h6>
      </div>

      <IconContext.Provider value={{ size: 18 }}>
        <div className={sidebar ? "setSidebar" : "sidebar"}>
          <div className="toggle-button2" onClick={menuIconClick}>
            {sidebar ? <FaIcons.FaBars /> : <FaIcons.FaTimes />}
            <span>Dashboard</span>
          </div>

          <ul className="sidebar-items">
            {SidebarData.map((item, index) => {
              return (
                <div onClick={() => setOptions(item?.option)}>
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span> {item.title} </span>
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </div>
      </IconContext.Provider>
    </>
  );
}

export default Sidebar;
