import React, { useContext, useEffect, useState } from "react";
import "./OngoingAppointment.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import CallIcon from "@mui/icons-material/Call";
import CancelIcon from "@mui/icons-material/Cancel";
import VideocamIcon from "@mui/icons-material/Videocam";
//import VideoPlayer from "../Online Video Call/VideoPlayer";
import { SocketContext } from "../../SocketContext";
import { CallEnd } from "@mui/icons-material";

function OngoingAppointment({ appointment }) {
  const [patient, setPatient] = useState();
  const [doctor, setDoctor] = useState();
  const { user } = useContext(AuthContext);
  const [showVideoBox, setShowVideoBox] = useState(true);
  const {
    addUser,
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
  } = useContext(SocketContext);
  const [refresher, setRefresher] = useState(0);

  // useEffect(() => {
  //   //adding socket user
  //   console.log("me>>>>>>>>>>> ", me);
  //   addUser(user?.id);
  //   setName(user?.name);
  // }, [user]);
  useEffect(() => {
    // console.log("appointment>>> ", appointment);
    if (user.userRole === "1") {
      axios
        .get(
          "http://localhost:5000/api/users/getUserBy?userId=" +
            appointment?.doctorId
        )
        .then((res) => setDoctor(res.data[0]))
        .catch((error) => console.error(error));
    } else if (user.userRole === "2") {
      axios
        .get(
          "http://localhost:5000/api/users/getUserBy?userId=" +
            appointment?.userId
        )
        .then((res) => setPatient(res.data[0]))
        .catch((error) => console.error(error));
    }
  }, [callAccepted, callEnded, refresher]);
  useEffect(() => {
    //console.log("patient>>>> ", patient);
  }, [patient]);
  useEffect(() => {
    //console.log("doctor>>>> ", doctor);
  }, [doctor]);
  setInterval(() => {
    //console.log("refreshing", refresher);
  }, 1000);
  useEffect(() => {
    // console.log("ongoing Appointment", appointment);
  }, []);
  return (
    <>
      <div className="ongoing__appointment">
        <div className="patient__info">
          <h1>{user.userRole === "1" ? "Doctor" : "Patient"}</h1>
          <img
            className="user__profile__img"
            src={user.userRole === "1" ? doctor?.picture : patient?.picture}
          />
          <div className="user__name">
            <span>Name: </span>
            <span>{user.userRole === "1" ? doctor?.name : patient?.name}</span>
          </div>
          <div className="user__name">
            <span>Email: </span>
            <span>
              {user.userRole === "1" ? doctor?.email : patient?.email}
            </span>
          </div>
        </div>
        <div className="video__call__settings">
          <div className="appointment__details">
            <h1>Appointment Details</h1>
            <div className="appointment__title">
              <span className="label">Title: </span>
              <span className="text">{appointment.title}</span>
            </div>
            <div className="appointment__title">
              <span className="label">description: </span>
              <span className="text">{appointment.description}</span>
            </div>
          </div>
          <Link
            className="start__video__btn"
            to={
              user.userRole === "1"
                ? `/video-call/${appointment._id}`
                : `/video-call/${appointment._id}`
            }
          >
            {/* <CallIcon />
          {user.userRole === "1" ? "Call the Doctor " : " Call the Patient"} */}
            <VideocamIcon />
            Attend Appointment
          </Link>
          {/* <button
          className="start__video__btn"
          onClick={() => setShowVideoBox(true)}
        >
          <CallIcon />
          {user.userRole === "1" ? "Call the Doctor " : " Call the Patient"}
        </button> */}
          {/* {callAccepted && !callEnded ? (
          <button
            className="start__video__btn"
            variant="contained"
            color="secondary"
            fullWidth
            onClick={leaveCall}
          >
            Hang Up
          </button>
        ) : (
          <button
            className="start__video__btn"
            variant="contained"
            color="primary"
            fullWidth
            onClick={() =>
              callUser(user.userRole === "1" ? doctor?._id : patient?._id)
            }
          >
            Call
          </button> */}
          {/* )} */}
          {/* //<Notifications /> */}
          {/* <Sidebar
          personToCallId={user.userRole === "1" ? doctor?._id : patient?._id}
        >
          <Notifications />
        </Sidebar>
        {showVideoBox && (
          // <div className="video-chat-container">
          // <div>
          //   <CancelIcon onClick={() => setShowVideoBox(false)} />
          <VideoPlayer />
          // </div>
          // </div>
        )} */}
        </div>
      </div>
    </>
  );
}

export default OngoingAppointment;
