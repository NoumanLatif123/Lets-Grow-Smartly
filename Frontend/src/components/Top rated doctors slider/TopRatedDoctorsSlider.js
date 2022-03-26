import React, { useState, useEffect } from "react";
import "./TopRatedDoctorsSlider.css";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import axios from "axios";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";

function TopRatedDoctorsSlider() {
  const [current, setCurrent] = useState(0);
  const [topRatedDoctors, setTopRatedDoctors] = useState();
  //const slides = SliderData;
  const length = topRatedDoctors?.length;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/top-rated-doctors`)
      .then((res) => {
        setTopRatedDoctors(res.data);
        console.log("top rated doctors>>> ", res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(topRatedDoctors) || topRatedDoctors.length <= 0) {
    return null;
  }

  return (
    <div className="top__doctors__slider">
      <div className="header">
        <h1>Our Top Rated Doctors</h1>
      </div>
      <div className="body">
        <section className="slider">
          <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
          <FaArrowAltCircleRight className="right-arrow" onClick={nextSlide} />
          {topRatedDoctors?.map((doctor, index) => {
            return (
              <div
                className={index === current ? "slide active" : "slide"}
                key={index}
              >
                {index === current && (
                  //   <img src={slide.image} alt="travel image" className="image" />
                  <div className="doctor__info">
                    <img
                      src={
                        doctor.picture
                          ? doctor.picture
                          : "https://st.depositphotos.com/2101611/3925/v/600/depositphotos_39258143-stock-illustration-businessman-avatar-profile-picture.jpg"
                      }
                    ></img>
                    <h1>Name : {doctor.name}</h1>
                    <h1>Qualification: {doctor.qualification}</h1>
                    <div className="rating__container">
                      {Array(parseInt(doctor.rating))
                        .fill()
                        .map((_, i) => (
                          <span>
                            <StarIcon />
                          </span>
                        ))}
                      <span>({doctor.rating})</span>
                    </div>
                    <Link
                      to={`/profile/${doctor._id}`}
                      /* to={`/book-appointments/${item._id}`} */
                    >
                      <button className="specialist__container__items__div__items__button">
                        View Profile
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

export default TopRatedDoctorsSlider;
