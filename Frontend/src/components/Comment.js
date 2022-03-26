import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Comment({ name, commentTxt, clicked }) {
  return (
    <div className="comment active ">
      <h6 className="comment__writer">{name}</h6>

      <p className="comment__text">{commentTxt}</p>
    </div>
  );
}

export default Comment;
