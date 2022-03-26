import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../SocketContext";

import { Phone, PhoneDisabled } from "@mui/icons-material";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Sidebar = ({
  children,
  receiverId,
  receiverName,
  receiverType,
  appointmentId,
}) => {
  const {
    me,
    callAccepted,
    name,
    setName,
    callEnded,
    leaveCall,
    callUser,
    setCallEnded,
  } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const history = useHistory();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log(receiverId, receiverName, " at sidebar");
    setName(receiverName);
    setIdToCall(receiverId);
  }, [receiverId, receiverName]);
  useEffect(() => {
    console.log("appointment id at sidebar: ", appointmentId);
  });
  useEffect(async () => {
    if (callEnded === true) {
      leaveCall();

      //setting appointment status attended
      // if (callEnded == true) {

      const data = {
        appointmentId: appointmentId,
        status: "Attented",
      };
      axios
        .put(`http://localhost:5000/api/appointment/update`, data)
        .then((res) => console.log("appointment after updation>> ", res.data))
        .catch((err) => console.log(err));

      // try {
      //   const data = {
      //     appointmentId: appointmentId,
      //     status: "Attented",
      //   };
      //   const res = axios.put(
      //     `http://localhost:5000/api/appointment/update`,
      //     data
      //   );
      // } catch (error) {
      //   console.log(error.message);
      // }
      // }
      if (user.userRole === "1") {
        history.push(`/video-call/rating-and-review/${appointmentId}`);
      } else {
        history.push("/doctor/appointment");
      }
      //sending notification

      axios
        .post(`http://localhost:5000/api/notifications/`, {
          receiverId: receiverId,
          text: `You have attended an Appointment successfully.`,
          read: false,
        })
        .then((res) => res)
        .catch((err) => console.log);
    }
  }, [callEnded]);

  return (
    <div className="video__call__options__container">
      <div className="video__call__options__container__buttons">
        {callAccepted && !callEnded ? (
          <button
            onClick={() => leaveCall(receiverId)}
            className="endCall__btn"
          >
            <PhoneDisabled fontSize="large" />
            Hang Up
          </button>
        ) : (
          <button onClick={() => callUser(idToCall)} className="startCall__btn">
            <Phone fontSize="large" />
            {receiverType === "1" ? "Call the Doctor" : "Call the Patient"}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default Sidebar;
