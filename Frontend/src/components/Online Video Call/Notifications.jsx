import React, { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { Button } from "@material-ui/core";

const Notifications = () => {
  const { answerCall, call, callAccepted } = useContext(SocketContext);

  return (
    <>
      {call.isReceivingCall && !callAccepted && (
        <div className="video__call__notification__box">
          <h1>{call.name} is calling:</h1>
          <button className="video__call__answerCall__btn" onClick={answerCall}>
            Answer
          </button>
        </div>
      )}
    </>
  );
};

export default Notifications;
