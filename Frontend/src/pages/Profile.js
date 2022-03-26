// import React, { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import ReactStars from "react-rating-stars-component";
// import UserRating from "../components/Modal/user-rating";
// import { Link, useParams } from "react-router-dom";
// import Navbar from "../components/Navbar/Navbar";
// //import { useState } from "react";
// //import { CopyToClipboard } from "react-copy-to-clipboard";

// const Profile = () => {
//   // const [text, setText] = useState("");
//   const params = useParams();

//   useEffect(() => {
//     console.log("doctor id >>> ", params.doctorId);
//   });
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm({ mode: "onChange" });
//   const [show, setshow] = useState(false);
//   const ratingChanged = (newRating) => {
//     console.log(newRating);
//   };
//   const onSubmit = (data) => {
//     console.log(data);
//     reset();
//     setshow(false);
//   };

//   return (
//     <div>
//       <Navbar />
//       <Link to={`/book-appointments/${params.doctorId}`}>
//         <button>Book Appointment</button>
//       </Link>

//       <button className="modal-button" onClick={() => setshow(true)}>
//         User Rating
//       </button>
//       <UserRating
//         title="User Rating"
//         onClose={() => setshow(false)}
//         show={show}
//       >
//         <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
//           <div className="user-rating">
//             <ReactStars
//               count={5}
//               onChange={ratingChanged}
//               size={24}
//               isHalf={true}
//               emptyIcon={<i className="far fa-star"></i>}
//               halfIcon={<i className="fa fa-star-half-alt"></i>}
//               fullIcon={<i className="fa fa-star"></i>}
//               activeColor="#ffd700"
//             />
//           </div>

//           <textarea
//             placeholder="Write your Feedback"
//             rows="4"
//             cols="50"
//             type="text"
//             className={`form-control ${errors.review && "is-invalid"}`}
//             {...register("review", { required: true })}
//           />

//           {errors.review && errors.review.type === "required" && (
//             <p>It is a required field</p>
//           )}

//           <input placeholder="Name" className="nameinput" type="text"></input>
//           <input placeholder="Email" className="emailinput" type="text"></input>

//           <div className="modal-footer">
//             <button className="modal-button1" type="submit">
//               Add Rating
//             </button>
//           </div>
//         </form>
//       </UserRating>

//       {/*
//     <div className="container">
//       <input
//         type="text"
//         value={text}
//         placeholder="Type some text here"
//         onChange={(event) => setText(event.target.value)}
//       />
//       <CopyToClipboard text={text} >
//         <div className="copy-area">
//           <button>Copy to Clipboard</button>
//         </div>
//       </CopyToClipboard>
//     </div>
//     */}
//     </div>
//   );
// };

// export default Profile;
import React, { useState, Fragment, useContext, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css";
import { Link, useHistory, useParams } from "react-router-dom";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import Comment from "../components/Comment";
import { format } from "timeago.js";

function Profile() {
  const params = useParams();
  const { user } = useContext(AuthContext);
  const [doctor, setDoctor] = useState();
  const history = useHistory();
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
      .then((res) => {
        user.picture = res.data[0].picture;
        user.approvalStatus = res.data[0].approvalStatus;

        if (res.data[0].approvalStatus === "pending") {
          history.push("/pending-application");
        } else {
          user.userRole === "1"
            ? history.push(`/profile/${params.doctorId}`)
            : history.push("/profile");
        }
        // console.log(user.picture);
      })
      .catch((error) => console.error(error));
    console.log("user>>>>> ", user);
  }, []);
  useEffect(() => {
    let id = params.doctorId ? params.doctorId : user.id;
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + id)
      .then((res) => {
        setDoctor(res.data[0]);
        let rating = parseFloat(res.data[0].rating);
        setRating(parseInt(rating));
      })
      .catch((error) => console.error(error));
    //setting reviews
    console.log("setting reviews");
    axios
      .get(`http://localhost:5000/api/reviews/${id}`)
      .then((res) => {
        // console.log("reviews data> ", res.data);
        setReviews(res.data);
      })
      .catch((err) => console.log);
  }, []);
  //useEffect(() => {
  //   if (params.doctorId) {
  //     const doctorId = params.doctorId;
  //     axios
  //       .get("http://localhost:5000/api/users/getUserBy?userId=" + doctorId)
  //       .then((res) => {
  //         setDoctor(res.data[0]);
  //         let rating = parseFloat(res.data[0].rating);
  //         setRating(parseInt(rating));
  //       })
  //       .catch((error) => console.error(error));
  //     //setting reviews
  //     console.log("setting reviews");
  //     axios
  //       .get(`http://localhost:5000/api/reviews/${doctorId}`)
  //       .then((res) => {
  //         // console.log("reviews data> ", res.data);
  //         setReviews(res.data);

  //       })
  //       .catch((err) => console.log);
  //   } else if (user?.userRole === "2") {
  //     setDoctor(user);

  //     //setting reviews

  //     axios
  //       .get(`http://localhost:5000/api/reviews/${user.id}`)
  //       .then((res) => {
  //         // console.log("reviews data> ", res.data);
  //         setReviews(res.data);
  //       })
  //       .catch((err) => console.log);
  //   }
  // }, []);

  console.log("reviews>>>>>", reviews);
  // console.log("user", user);
  // console.log("doctor", doctor);

  return (
    <Fragment>
      <Navbar />

      <div className="lower-navbar">
        <h5>Profile</h5>
        <h6>See personal Info</h6>
      </div>

      <div className="profile__page__container">
        <div className="line2"> &nbsp;</div>
        <h1>Profile</h1>
        <div className="profile__container">
          <img
            src={
              doctor?.picture
                ? doctor?.picture
                : "https://st4.depositphotos.com/1156795/20814/v/450/depositphotos_208142524-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"
            }
            className="profile__image"
          />
          <div className="user__info">
            <h3>
              Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;{doctor?.name}
            </h3>
            <h3>Qualification&nbsp;&nbsp;&nbsp; {doctor?.qualification}</h3>
            <div className="user__rating">
              {console.log("doctor at rating box ", doctor)}
              {doctor?.rating === "no rating" ? (
                <h3>&nbsp;&nbsp;No rating</h3>
              ) : (
                <>
                  {Array(rating)
                    .fill()
                    .map((_, i) => (
                      <span>
                        <StarIcon />
                      </span>
                    ))}
                  <span>({doctor?.rating})</span>
                </>
              )}
            </div>
            {user?.userRole === "2" ? (
              <Link to={`/doctor/appointment`}>
                <button className="specialist__container__items__div__items__button">
                  See Appointments
                </button>
              </Link>
            ) : (
              <Link to={`/book-appointments/${doctor?._id}`}>
                <button className="specialist__container__items__div__items__button">
                  Book Appointment
                </button>
              </Link>
            )}
          </div>
        </div>
        <div className="comment__box">
          <h1 className="heading">Reviews ({reviews?.length})</h1>

          <div className="comments">
            {reviews?.length > 0 ? (
              reviews.map((review) => (
                // <Comment
                //   name={review?.username}
                //   commentTxt={review?.review}
                //   clicked={settingActiveClass}
                // />
                <div className="review">
                  <h4>{review?.username}</h4>
                  <p>{review?.review}</p>
                  <span>{format(review?.createdAt)}</span>
                </div>
              ))
            ) : (
              <h1>No reviews.</h1>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Profile;
