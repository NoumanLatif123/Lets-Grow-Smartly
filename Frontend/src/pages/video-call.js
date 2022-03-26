import React, { useState, useEffect, useContext } from "react";
import Navbar from "../components/Navbar/Navbar";
import Notifications from "../components/Online Video Call/Notifications";
import Sidebar from "../components/Online Video Call/Sidebar";
import VideoPlayer from "../components/Online Video Call/VideoPlayer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../SocketContext";
import "./video-call.css";

const VideoCall = () => {
  const { addUser, me, callEnded, leaveCall } = useContext(SocketContext);
  const { user } = useContext(AuthContext);
  const params = useParams();
  const appointmentId = params.appointmentId;
  const [receiver, setReceiver] = useState();
  const [appointment, setAppointment] = useState();
  const [receiverId, setReceiverId] = useState();

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/api/appointment/getByAppointmentId/${appointmentId}`
      )
      .then((res) => {
        setAppointment(res.data);
        let idOfReceiver =
          user.userRole === "1" ? res.data.doctorId : res.data.userId;
        setReceiverId(idOfReceiver);
        axios
          .get(
            "http://localhost:5000/api/users/getUserBy?userId=" + idOfReceiver
          )
          .then((res) => setReceiver(res.data[0]))
          .catch((error) => console.error(error));
      });
  }, [appointmentId]);

  useEffect(() => {
    //adding socket user
    console.log("me>>>>>>>>>>> ", me);
    addUser(user?.id);
  }, [user]);
  return (
    <div className="video__call__container">
      {/* <div className="video__call__navbar">
        <h3>Discuss your health face to face .</h3>
      </div> */}
      <VideoPlayer />
      <Sidebar
        receiverId={receiverId}
        receiverName={receiver?.name}
        receiverType={receiver?.usertype}
        appointmentId={appointmentId}
      ></Sidebar>
      <Notifications />
    </div>
  );
};

export default VideoCall;

// const videoCall = () => {
//   return (
//     <div>
//       <Navbar />
//       <VideoPlayer />
//       <Options>
//         <Notifications />
//       </Options>
//     </div>
//   );
// };

// export default videoCall;
