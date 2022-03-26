import React from "react";
import "./ReceiverInfo.css";
import { Avatar, IconButton } from "@mui/material";
import { Link } from "react-router-dom";

function ReceiverInfo({ receiver }) {
  //console.log("recieverr>>> ", receiver);
  return (
    <div class="receiverInfo">
      {/*<Avatar className="avatar" src={receiver?.picture} />*/}
      <img
        className="avatar"
        src={
          receiver.picture
            ? receiver.picture
            : "https://media.istockphoto.com/vectors/avatar-5-vector-id1131164548?k=20&m=1131164548&s=612x612&w=0&h=ODVFrdVqpWMNA1_uAHX_WJu2Xj3HLikEnbof6M_lccA="
        }
        alt=""
      />
      <div className="infoBox">
        <div className="infoElement">
          <span>Name</span>
          <span>{receiver?.name}</span>
        </div>
        <div className="infoElement">
          <span>Email</span>
          <span>{receiver?.email}</span>
        </div>
        <div className="infoElement">
          <span>Usertype</span>
          <span>{receiver?.usertype === "1" ? "Patient" : "Doctor"}</span>
        </div>
        {receiver?.usertype === "2" ? (
          <div className="infoElement">
            <span>Qualification</span>
            <span>{receiver?.qualification}</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      {receiver?.usertype === "2" ? (
        <div className="appointmentBtn">
          <Link
            to={`/book-appointments/${receiver?._id}`}
            className="specialist__container__items__div__items__button"
          >
            Book Appointment
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ReceiverInfo;
