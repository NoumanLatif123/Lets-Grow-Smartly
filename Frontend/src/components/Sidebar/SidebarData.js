import React from "react";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaIcons.FaHome />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaIcons.FaColumns />,
    cName: "nav-text",
  },
  {
    title: "Pending Appointment",
    path: "/dashboard",
    icon: <FaIcons.FaClock />,
    cName: "nav-text",
    option: 1,
  },
  {
    title: "Confirm Appointment",
    path: "/dashboard",
    icon: <FaIcons.FaRegCalendarCheck />,
    cName: "nav-text",
    option: 2,
  },
  {
    title: "Cancel Appointment",
    path: "/dashboard",
    icon: <ImIcons.ImCross />,
    cName: "nav-text",
    option: 3,
  },
  {
    title: "Attend Appointment",
    path: "/dashboard",
    icon: <FaIcons.FaRegClipboard />,
    cName: "nav-text",
    option: 4,
  },
  {
    title: "Ongoing Appointment",
    path: "/dashboard",
    icon: <FaIcons.FaCamera />,
    cName: "nav-text",
    option: 5,
  },
  {
    title: "Community Garage",
    path: "/community-garage",
    icon: <FaIcons.FaUsers />,
    cName: "nav-text",
  },
  {
    title: "Chat Room",
    path: "/messenger",
    icon: <FaIcons.FaCommentDots />,
    cName: "nav-text",
  },
  {
    title: "Account General Settings",
    path: "/account-general-settings",
    icon: <FaIcons.FaCog />,
    cName: "nav-text",
  },
];
