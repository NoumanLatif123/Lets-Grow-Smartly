import React, { useState, Fragment, useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { ErrorMessage } from "@hookform/error-message";
import signupUseForm from "./signup/signupUseForm";
//import validate from "./signup/validateInfo";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import "./account-general-setting.css";
import { IconButton } from "@mui/material";
import IosShareIcon from "@mui/icons-material/IosShare";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import SignupUseForm from "./signup/signupUseForm";
import validate from "./signup/validateInfo";
import axios from "axios";

import SendIcon from "@mui/icons-material/Send";

function AccountGeneralSettings() {
  const { onChange, uploadedImage } = signupUseForm(validate);
  const { register, handleSubmit, onSubmit, errors } = useUpdateProfile();
  const { user } = useContext(AuthContext);
  //  const { onChange, handleSubmit, credentials, errors, uploadedImage } =
  //   SignupUseForm(validate);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [refresher, setRefresher] = useState();
  const [radio, setRadio] = useState(1);

  useState(() => {
    setRefresher(Math.random() * 3000);
  }, []);
  useEffect(() => {
    if (!user.id) {
      axios
        .get(`http://localhost:5000/api/users/getUserBy?username=${user?.name}`)
        .then((res) => {
          // console.log(res.data._id);
          user.id = res.data._id;
          user.picture = res.data.picture;
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
        .then((res) => {
          user.picture = res.data[0].picture;
          user.name = res.data[0].name;
          console.log(user.picture);
        })
        .catch((error) => console.error(error));
    }

    setIsImageUploaded(false);
    //console.log(user);
  }, [isImageUploaded, refresher, user]);
  // useEffect(() => {
  //   console.log("user>>> ", user);
  // }, [user]);

  const uploadProfileImage = (e) => {
    e.preventDefault();
    console.log("updating profile....");
    const fileInput = document.getElementById("updateProfileImageInput");
    const file = document.getElementById("updateProfileImageInput").files;
    console.log("file >>> ", file);
    if (file[0].name !== "") {
      const formData = new FormData();
      formData.append("img", file[0]);

      fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      })
        .then((r) => {
          /*console.log(r);*/
        })
        .catch((e) => {
          console.log(e);
        });
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          imgUrl: `http://localhost:5000/api/upload/${file[0]?.name}`,
        }),
      };
      fetch(
        "http://localhost:5000/api/users/updateProfileImage",
        requestOptions
      )
        .then((r) => {
          /*console.log(r);*/
        })
        .catch((e) => {
          console.log(e);
        });
      user.picture = `http://localhost:5000/api/upload/${file[0]?.name}`;
      setIsImageUploaded(true);
    } else {
      alert("select proper profile image!");
    }
  };

  function handleRadioChange(event) {
    //console.log(event);
    radio === 1 ? setRadio(2) : setRadio(1);
  }
  function refresh() {
    setTimeout(() => {
      setIsImageUploaded(true);
    }, 500);
  }
  return (
    <Fragment>
      <Navbar />
      <div className="lower-navbar">
        <h5>Account General Settings</h5>
        <h6>Edit Personal Details</h6>
      </div>

      <div className="appointment-form updation_container">
        <div className="line1"></div>
        <h1>Account General Settings</h1>
        <div className="profile-image-container">
          <img
            src={
              user.picture
                ? user.picture
                : "https://st4.depositphotos.com/1156795/20814/v/450/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"
            }
            className="account-setting-profile-img"
          />
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
        </div>
        <div
          className="radioBtn1"
          onChange={(event) => handleRadioChange(event)}
        >
          <input type="radio" name="formtype" value="1" defaultChecked />
          <span>Change Name and Password</span>

          <input type="radio" name="formtype" value="2" />
          <span>Change Profile Picture</span>
        </div>
        {radio === 2 && (
          <div className="updation_form">
            {/* <label for="updateUsername">Enter new username</label>
          <div
            style={{
              display: "flex",
              alignItems: "flexStart",
              justifyContent: "flexStart",
            }}
          >
            <input type="text" name="updateUsername" id="updateUsernameInput" />
            <IconButton
              className="updateInfoBtn"
              onClick={(e) => updateUsername(e)}
            >
              <SendIcon />
            </IconButton>
          </div> */}
            <label for="select-profile">Select a profile picture</label>
            <div
              style={{
                display: "flex",
                alignItems: "flexStart",
                justifyContent: "flexStart",
              }}
            >
              <input
                type="file"
                name="select-profile"
                id="updateProfileImageInput"
                //value={user.picture}
              />
              <IconButton
                className="updateInfoBtn"
                onClick={(e) => uploadProfileImage(e)}
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
        )}

        {/******** updation form 2 */}
        {radio === 1 && (
          <form className="updateForm2" onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="appointmentBtn updateInfoBtn">
     <Link
       className="specialist__container__items__div__items__button"
       onClick={(e) => {
         uploadProfileImage(e);
         updateUsername(e);
       }}
     >
       Upload Profile
     </Link>
   </div> */}

            {/* <label className="label"> Name </label> */}
            <input
              type="text"
              name="name"
              placeholder="Enter new name"
              className={`form-control ${errors.name && "is-invalid"}`}
              {...register("name", { required: "Name is required" })}
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => <p>{message}</p>}
            />

            {/* <label className="label">New Password </label> */}
            <input
              type="password"
              name="password"
              placeholder="Enter a new password "
              className={`form-control ${errors.password && "is-invalid"}`}
              {...register("password", {
                minLength: {
                  value: 5,
                  message: "Password must have atleast 5 characters",
                },
              })}
            />
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ message }) => <p>{message}</p>}
            />
            {/* <label className="label">Current Password (required) </label> */}
            <input
              type="password"
              name="old_password"
              placeholder="Current Password (required)"
              className={`form-control ${errors.password && "is-invalid"}`}
              {...register("old_password", {
                minLength: {
                  value: 5,
                  message: "Password must have atleast 5 characters",
                },
                required: "Current Password is required",
              })}
            />
            <ErrorMessage
              errors={errors}
              name="old_password"
              render={({ message }) => <p>{message}</p>}
            />

            <button type="submit" onClick={() => refresh()}>
              Submit
            </button>
            {/*</div>*/}
          </form>
        )}

        {/*********************** */}
      </div>
    </Fragment>
  );
}

export default AccountGeneralSettings;
