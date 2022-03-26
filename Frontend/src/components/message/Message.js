import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Message({ message, own }) {
  // console.log("mesaage>>>>>>>>>>>>>> ", message);

  // setTimeout(() => {
  //   if (own === false && message.isReceived === false) {
  //     const data = {
  //       messageId: message._id,
  //       isReceived: true,
  //     };
  //     axios.put(`http://localhost:5000/api/messages/update`, data);
  //   }
  // }, 500);

  //console.log("image url>>> ", message?.imageUrl);
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        {message?.imgUrl ? (
          <a href={message?.imgUrl}>
            <img className="messageImg" src={message?.imgUrl} alt="" />
          </a>
        ) : (
          <p className="messageText">{message?.text}</p>
        )}
      </div>
      <div className="messageBottom">{format(message?.createdAt)}</div>
    </div>
  );
}
