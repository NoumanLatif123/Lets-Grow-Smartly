import React from "react";
import { Link } from "react-router-dom";
import "./PendingApplication.css";
import HourglassFullIcon from "@mui/icons-material/HourglassFull";

const PendingApplication = () => {
  function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.open("/", "_self");
  }
  return (
    <div className="notfound">
      <div>
        <h1 className="notfound-text">Your Application is under process.</h1>
        <p className="notfound-text">Please visit after a while</p>
        <Link className="link-btn" onClick={logout}>
          Login Again
        </Link>
      </div>
    </div>
  );
};

export default PendingApplication;
