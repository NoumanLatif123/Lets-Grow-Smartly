import React, { useState, useEffect, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
//import * as FiIcons from "react-icons/fi";
//import { IconContext } from 'react-icons';
import "./Notifications.css";
import { AuthContext } from "../../context/AuthContext";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar } from "@mui/material";
import axios from "axios";
import CancelIcon from "@mui/icons-material/Cancel";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { format } from "timeago.js";

function Notifications({ hideNotifications, notifications }) {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    //console.log("opening notification...");
    //console.log("notifications in Noti?>>", notifications);

    //updating read status
    notifications.forEach((notif) => {
      const data = {
        notificationId: notif._id,
        read: true,
      };
      axios.put(`http://localhost:5000/api/notifications/update`, data);
    });
  }, [notifications]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [notifications]);
  return (
    <div className="notif_container">
      <div className="notifications_box">
        <header>
          <h1>Notifications</h1>
          <CancelIcon onClick={() => hideNotifications()} />
        </header>
        <section className="scroll">
          {notifications?.map((notification) => (
            <div className="notification" ref={scrollRef}>
              <CircleNotificationsIcon />
              <p>{notification.text}</p>
              <span>{format(notification?.createdAt)}</span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Notifications;
