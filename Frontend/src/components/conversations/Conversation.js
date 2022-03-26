import axios from "axios";
import React, { useEffect, useState } from "react";

import "./conversation.css";

function Conversation({ conversation, currentUser, refreshMsgs }) {
  const [frontPerson, setFrontPerson] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);

  //console.log("conversation>>> ", conversation);
  //console.log("currentUser>>> ", currentUser);

  useEffect(() => {
    const frontPersonId = conversation.members.find(
      (m) => m !== currentUser.id
    );
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + frontPersonId)
      .then((res) => setFrontPerson(res.data[0]))
      .catch((error) => console.error(error));
  }, [currentUser, conversation, unreadMsgCount]);
  useEffect(() => {
    //console.log("inner refreshing");
    try {
      axios
        .get("http://localhost:5000/api/messages/" + conversation?._id)
        .then((res) => {
          //console.log("rola>>> ", res?.data);
          let count = 0;
          const messages = res.data;
          messages.map((message) => {
            //console.log("userId> ", currentUser.id);
            // console.log("sender> ", message.sender);
            //console.log("isReceived> ", message.isReceived);
            if (
              currentUser.id !== message.sender &&
              message.isReceived === false
            ) {
              count++;
            }
          });
          setUnreadMsgCount(count);
        });
    } catch (err) {
      console.log(err);
    }
  }, [conversation, currentUser, refreshMsgs]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          frontPerson?.picture
            ? frontPerson?.picture
            : "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
        }
        alt=""
      />
      <span className="conversationName">
        {frontPerson?.name ? frontPerson?.name : "loading..."}
      </span>
      {unreadMsgCount > 0 ? (
        <span className="unreadMsgCount">{unreadMsgCount}</span>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Conversation;

// import "./conversation.css";
// import axios from "axios";
// import { useEffect, useState } from "react";

// export default function Conversation({ conversation, currentUser }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const friendId = conversation.members.find((m) => m !== currentUser._id);

//     const getUser = async () => {
//       try {
//         const res = await axios(
//           "http://localhost:5000/api/auth/getuser?userId=" + friendId
//         );
//         setUser(res.data);
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getUser();
//   }, [currentUser, conversation]);

//   return (
//     <div className="conversation">
//       <img
//         className="conversationImg"
//         src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//         alt=""
//       />
//       <span className="conversationName">umair</span>
//     </div>
//   );
// }
