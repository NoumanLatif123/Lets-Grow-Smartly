import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FiIcons from "react-icons/fi";
//import { IconContext } from 'react-icons';
import "../Navbar/Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
import axios from "axios";
import Notifications from "../Notifications/Notifications";
import { io } from "socket.io-client";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [allNotifications, setAllNotifications] = useState([]);
  const [unreadNotificationCount, setUnreadNotificationCount] = useState(0);
  const [refresher, setRefresher] = useState();
  const [arrivalNotification, setArrivalNotification] = useState();
  const { user } = useContext(AuthContext);
  const socket = useRef();

  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.open("/", "_self");
  }
  //console.log("user in navbar>>> ", user);
  useEffect(() => {
    socket.current = io("ws://localhost:8990");
    //console.log("user at home >>>> ", user);
    //console.log("id>> ", user.id);

    if (!user.id) {
      axios
        .get(`http://localhost:5000/api/users/getUserBy?username=${user?.name}`)
        .then((res) => {
          // console.log(res.data._id);
          user.id = res.data._id;
          user.picture = res.data.picture;
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
        .then((res) => {
          user.picture = res.data[0].picture;
          user.name = res.data[0].name;
          //console.log(user.picture);
        })
        .catch((error) => console.error(error));
    }

    // console.log("user after >>>", user);
  }, [refresher]);
  const hideNotifications = () => {
    setShowNotifications(false);
  };

  //notification system
  useEffect(() => {
    //setUnreadNotificationCount(0);
    let count = 0;

    // console.log("user at nav >>> ", user);
    if (user?.isAdmin || user?.userRole === "3") {
      axios
        .get(`http://localhost:5000/api/notifications/forAdmins`)
        .then((res) => {
          //console.log(res.data);
          setAllNotifications(res.data);
          const notifications = res.data;
          notifications.forEach((notification) => {
            if (notification?.read == false) {
              count++;
            }
          });
        })
        .catch((err) => console.log);
    } else {
      axios
        .get(`http://localhost:5000/api/notifications/${user.id}`)
        .then((res) => {
          //console.log(res.data);
          setAllNotifications(res.data);
          const notifications = res.data;

          /********************* */
          notifications.forEach((notification) => {
            if (notification?.read == false) {
              count++;
            }
          });
        })
        .catch((err) => console.log);
    }

    setTimeout(() => {
      setUnreadNotificationCount(count);
      //console.log("count > ", count);
      //console.log("Unread Notif > ", unreadNotificationCount);
    }, 500);
  }, [refresher]);

  const showNotificationsContainer = (e) => {
    e.preventDefault();
    showNotifications
      ? setShowNotifications(false)
      : setShowNotifications(true);
    setShowDropDown(false);
    setRefresher(Math.floor(Math.random() * 56));
  };

  const showDropDownContainer = (e) => {
    e.preventDefault();
    setShowNotifications(false);
    showDropDown ? setShowDropDown(false) : setShowDropDown(true);
  };

  return (
    <>
      <nav className="navbar">
        <div className="brand-title">
          <Link to="/">
            <img
              src="http://localhost:5000/api/upload/logo.png"
              alt="Picture"
            />
            {/* <img src="assets/pictures/logo.png" alt="Picture" /> */}
            <span>LET'S GROW SMARTLY</span>
          </Link>
          <div
            className="toggle-button1"
            onClick={() => setIsMobile(!isMobile)}
          >
            {isMobile ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
          </div>
        </div>
        <div
          className={isMobile ? "navbar-links-mobile" : "navbar-links"}
          onClick={() => setIsMobile(false)}
        >
          <ul>
            {user && user.userRole === "1" && (
              <>
                <li>
                  <Link to="../" className="cool-link">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="../search" className="cool-link">
                    Child Specialists
                  </Link>
                </li>
                <li>
                  <Link to="../dashboard" className="cool-link">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="../messenger" className="cool-link">
                    Messages
                  </Link>
                </li>

                <li>
                  <Link to="../community-garage" className="cool-link">
                    Community Garage
                  </Link>
                </li>
              </>
            )}
            {user && user.userRole === "2" && (
              <>
                <li>
                  <Link to="/doctor/appointment" className="cool-link">
                    Appointments
                  </Link>
                </li>
                <li>
                  <Link to="/profile" className="cool-link">
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="../messenger" className="cool-link">
                    Messages
                  </Link>
                </li>

                <li>
                  <Link to="../community-garage" className="cool-link">
                    Community Garage
                  </Link>
                </li>
              </>
            )}
            {user && user.userRole === "3" && (
              <>
                <li>
                  <Link to="./Admin" className="cool-link">
                    Admin Panel
                  </Link>
                </li>
              </>
            )}

            <li
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0px -14px 0px 0px",
              }}
            >
              <Link
                to="#"
                className=" notif-menu"
                onClick={(e) => showNotificationsContainer(e)}
              >
                <div className="bell">
                  <p className="anchor material-icons layer-1">
                    <NotificationsNoneIcon />
                  </p>
                  <p className="anchor material-icons layer-2">
                    <NotificationsNoneIcon />
                  </p>
                  <p className="anchor material-icons layer-3">
                    <NotificationsNoneIcon />
                  </p>
                </div>
                {unreadNotificationCount > 0 ? (
                  <span>{unreadNotificationCount}</span>
                ) : (
                  <></>
                )}
              </Link>
            </li>
            <li
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "-8px 26px 0px 0px",
              }}
            >
              <Link
                to="#"
                className=" notif-menu"
                onClick={(e) => showDropDownContainer(e)}
              >
                <Avatar
                  sx={{ width: 34, height: 34 }}
                  alt="dp"
                  src={user.picture}
                />
              </Link>
            </li>
            {/*
            <li className="navbar__logout">
              <button onClick={logout}>Logout</button>
            </li>

              */}
            {/* {
                        user && user.userRole === '1' || user.userRole === '2' &&
                        <li className="navbar__logout">
                            <button onClick={logout}>
                                Logout
                            </button>
                        </li>
                    } */}
            {/* 
                    <Link to="./login">
                    <IconContext.Provider value={{size: 15, color: '#fff'}}>
                        <button className='btn1'>
                            <FiIcons.FiLogOut className='fas-logout'/> 
                            <p>Log Out</p>
                        </button>
                    </IconContext.Provider>
                    </Link>

                        <IconContext.Provider value={{size: 13, color: '#fff'}}>
                            <FiIcons.FiLogOut /> 
                    
                        <i className="fas fa-user fas-customize-button"></i>
                        <i className="fas fa-caret-down fas-menubar">
                        <ul>
                            <li><Link to="./login">Login</Link></li>
                            <li><Link to="./signup">Sign Up</Link></li>
                        </ul>
                        </i>
                        </IconContext.Provider>
                    */}
          </ul>
        </div>
      </nav>
      {showNotifications ? (
        <Notifications
          hideNotifications={hideNotifications}
          notifications={allNotifications}
        />
      ) : (
        <></>
      )}

      {showDropDown ? (
        <div className="notif_container">
          <div className="dropdown_box">
            <header style={{ zIndex: "1000", cursor: "pointer" }}>
              <Link to="/account-general-settings">
                <h1>
                  <FaIcons.FaCog />
                  <span> Account General Settings</span>
                </h1>
              </Link>
            </header>
            <p>
              <h1 onClick={logout}>
                <FiIcons.FiLogOut />
                <span>Log out</span>
              </h1>
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default Navbar;
