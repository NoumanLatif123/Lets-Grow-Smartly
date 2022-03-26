import React, { useContext, useEffect, useState } from "react";
import "./RatingAndReview.css";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useHistory, useParams } from "react-router-dom";

function RatingAndReview() {
  const { user } = useContext(AuthContext);
  const params = useParams();
  const appointmentId = params.appointmentId;
  const history = useHistory();
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [doctorId, setDoctorId] = useState();

  useEffect(() => {
    console.log("appointment id at 0000", params.appointmentId);
    axios
      .get(
        `http://localhost:5000/api/appointment/getByAppointmentId/${params.appointmentId}`
      )
      .then((res) => {
        console.log("response of getting appointment", res.data);
        setDoctorId(res.data.doctorId);
      })
      .catch((err) => console.log(err));
  }, []);
  const submitReviewAndRatingForm = () => {
    if (review === "") {
      alert("enter review before submission");
      return;
    }
    const body = {
      appointmentId: appointmentId,
      userId: user.id,
      username: user.name,
      doctorId: doctorId,
      rating,
      review,
    };
    console.log("review body>>> ", body);
    axios
      .post("http://localhost:5000/api/reviews", body)
      .then((res) => {
        console.log("posting review result >>> ", res.data);
        //setting appointment rating

        const data = {
          appointmentId: appointmentId,
          status: "Attented",
          ratingByUser: rating,
        };
        axios
          .put(`http://localhost:5000/api/appointment/update`, data)
          .then((res) => console.log("updating appointment rating", res.data))
          .catch((err) => console.log(err));

        history.push("/dashboard");
      })
      .catch((err) => alert("review posting unsuccessful"));
  };
  return (
    <div className="rating__and__review__modal">
      <div className="rating__and__review__wrapper">
        <button
          onClick={() => history.push("/dashboard")}
          className="skip__button"
        >
          {"skip >>"}{" "}
        </button>
        <div className="rating__wrapper">
          <h1>
            Rate how was your experience with the doctor
            {/* <span> {doctorInfo?.name}</span>. */}
          </h1>
          <div className="rating__stars">
            <span
              onClick={() => setRating(1)}
              className={
                (rating === 1 && "shine") ||
                (rating === 2 && "shine") ||
                (rating === 3 && "shine") ||
                (rating === 4 && "shine") ||
                (rating === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setRating(2)}
              className={
                (rating === 2 && "shine") ||
                (rating === 3 && "shine") ||
                (rating === 4 && "shine") ||
                (rating === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setRating(3)}
              className={
                (rating === 3 && "shine") ||
                (rating === 4 && "shine") ||
                (rating === 5 && "shine")
              }
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setRating(4)}
              className={(rating === 4 && "shine") || (rating === 5 && "shine")}
            >
              <StarIcon />
            </span>
            <span
              onClick={() => setRating(5)}
              className={rating === 5 && "shine"}
            >
              <StarIcon />
            </span>
          </div>
        </div>
        <div className="review__wrapper">
          <h1>Give a review</h1>
          <input
            type="text"
            placeholder="leave a comment here ..."
            onChange={(e) => setReview(e.target.value)}
          />
          <button onClick={submitReviewAndRatingForm}>Submit</button>
        </div>
      </div>
    </div>
  );
}

export default RatingAndReview;
