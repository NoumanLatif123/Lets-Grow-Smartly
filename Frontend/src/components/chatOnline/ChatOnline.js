import React from "react";
import "./chatOnline.css";

function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Bani Adim</span>
      </div>
    </div>
  );
}

export default ChatOnline;

// import { useEffect } from "react";
// import { useStateValue } from "../../context/AuthContext";
// import "./chatOnline.css";

// export default function ChatOnline(props) {
//   return (
//     <div className="chatOnline">
//       <div className="chatOnlineFriend">
//         <div className="chatOnlineImgContainer">
//           <img
//             className="chatOnlineImg"
//             src="https://images.pexels.com/photos/3686769/pexels-photo-3686769.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//             alt=""
//           />
//           <div className="chatOnlineBadge"></div>
//         </div>
//         <span className="chatOnlineName">{props.username}</span>
//       </div>
//     </div>
//   );
// }
