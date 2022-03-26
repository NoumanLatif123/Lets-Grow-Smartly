import React, { Fragment, useEffect, useRef } from "react";
import "./doctorAppointments.css";
import "../../components/confirmedAppointments/confirmedApp.css";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useContext } from "react";
import "../../components/Sidebar/Sidebar.css";
import { useStateValue } from "../../context/messenger/StateProvider";
import { useHistory } from "react-router-dom";
import { io } from "socket.io-client";
import Navbar from "../../components/Navbar/Navbar";
import OngoingAppointment from "../../components/ongoingAppointment/OngoingAppointment";
import StarIcon from "@mui/icons-material/Star";
import AttentedAppointments from "../../components/attentedAppointments/AttentedAppointments";

const DoctorAppointments = () => {
  const [appointmentApplications, setappointmentApplications] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [ongoingAppointment, setOngoingAppointment] = useState();
  const [attendedAppointments, setAttendedAppointments] = useState([]);
  const [{ senderId, receiverId, createConversation }, dispatch] =
    useStateValue();
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const socket = useRef();
  //content types
  //1 for applications
  //2 for upcoming appointments
  //3 Ongoing appointment
  const [contentType, setContentType] = useState(3);

  useEffect(async () => {
    socket.current = io("ws://localhost:8990");
    try {
      const appointments1 = await axios.post(
        `http://localhost:5000/api/appointment/doctor/${user.id}`,
        { status: "Pending" }
      );
      setappointmentApplications(appointments1.data);
      //deleting pendingOnes if time is over
      appointments1?.data.map((appointment) => {
        const date1 = new Date(appointment.appointmentDate);
        date1.setHours(0, 0, 0, 0);
        const date2 = new Date(Date.now());
        date2.setHours(0, 0, 0, 0);
        // let timeNow = parseInt(new Date().getHours());
        // let TimetoTest = parseInt(appointment.appointmentTime.slice(0, 2));
        let timeNowInMinutes =
          parseInt(new Date().getHours()) * 60 +
          parseInt(new Date().getMinutes());
        let timeToTestMinutes =
          parseInt(appointment.appointmentTime.slice(0, 2)) * 60 +
          parseInt(appointment.appointmentTime.slice(3, 5));

        if (date1 > date2) {
          //console.log("appointment is not cancelled");
        } else if (date1 < date2) {
          cancelAppointment(
            appointment._id,
            appointment.userId,
            appointment.doctorId
          );
        } else {
          // console.log("date equal  ");
          if (timeNowInMinutes - timeToTestMinutes > 30) {
            cancelAppointment(
              appointment._id,
              appointment.userId,
              appointment.doctorId
            );
          }
        }
      });
      //confirm appointment
      axios
        .post(`http://localhost:5000/api/appointment/doctor/${user.id}`, {
          status: "Confirmed",
        })
        .then((res) => {
          setUpcomingAppointments(res.data);
          res.data.map((appointment) => {
            const date1 = new Date(appointment.appointmentDate);
            date1.setHours(0, 0, 0, 0);
            const date2 = new Date(Date.now());
            date2.setHours(0, 0, 0, 0);
            let timeNow = parseInt(new Date().getHours());
            let TimetoTest = parseInt(appointment.appointmentTime.slice(0, 2));

            if (date1 > date2) {
              //console.log("appointment is not cancelled");
            } else if (date1 < date2) {
              cancelAppointment(
                appointment._id,
                appointment.userId,
                appointment.doctorId
              );
            } else {
              // console.log("date equal  ");
              if (TimetoTest < timeNow) {
                cancelAppointment(
                  appointment._id,
                  appointment.userId,
                  appointment.doctorId
                );
              }
            }
          });
        });

      /*********************** */
      const appointments3 = await axios.post(
        `http://localhost:5000/api/appointment/doctor/${user.id}`,
        { status: "Attented" }
      );
      setAttendedAppointments(appointments3.data);
      setTimeout(() => {
        console.log("user>>>", user.id);
        console.log("attended at doctor appointment>> ", attendedAppointments);
      }, 1000);

      //setting ongoing appointment
      let currentDate = new Date(Date.now());
      currentDate.setHours(0, 0, 0, 0);
      const body = {
        doctorId: user.id,
        status: "Confirmed",
        date: currentDate,
      };
      axios
        .post(
          "http://localhost:5000/api/appointment/specificAppointments",
          body
        )
        .then((res) => {
          if (res.data[0]) {
            //console.log("todays appointments superr>>> ", res.data);
            res.data.map((appointment) => {
              let time = appointment?.appointmentTime;
              let timeInMinutes =
                parseInt(time.slice(0, 2)) * 60 + parseInt(time.slice(3, 5));
              let currentTimeInMinutes =
                parseInt(new Date().getHours()) * 60 +
                parseInt(new Date().getMinutes());
              // console.log("timeInMinutes", timeInMinutes);
              //console.log("currentTimeInMinutes", currentTimeInMinutes);
              if (
                currentTimeInMinutes >= timeInMinutes &&
                currentTimeInMinutes - timeInMinutes <= 30
              ) {
                setOngoingAppointment(res.data[0]);
              }
            });
          }
        });
    } catch (error) {
      console.log(error.message);
    }
  }, [contentType]);
  useEffect(() => {
    //updaing user rating record
    axios
      .get(`http://localhost:5000/api/reviews/${user.id}`)
      .then((res) => {
        // console.log("reviews data> ", res.data);
        //setReviews(res.data);
        if (res.data.length > 0) {
          const reviews = res.data;
          let totalRating = 0;
          let totalReviews = 0;
          reviews.map((review) => {
            //console.log("user rating >>", review.rating);
            totalReviews++;
            totalRating += parseFloat(review?.rating);
          });
          const averageRating = parseFloat(totalRating / totalReviews);
          var roundedAverageRating = Math.round(averageRating * 10) / 10;
          // alert("average rating" + roundedAverageRating);
          console.log("user.id ", user.id);
          console.log("rounded average rating ", roundedAverageRating);
          console.log("attended appointments", attendedAppointments);
          axios
            .put("http://localhost:5000/api/users/updateRating", {
              userId: user.id,
              rating: roundedAverageRating,
            })
            .then((res) => res.data)
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log);
  }, [attendedAppointments]);

  const confirmAppointment = async (id, receiverId, doctorId) => {
    try {
      const data = {
        appointmentId: id,
        status: "Confirmed",
      };
      const res = await axios.put(
        `http://localhost:5000/api/appointment/update`,
        data
      );
      setappointmentApplications(
        appointmentApplications.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
    //sending notification
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + doctorId)
      .then((res) => {
        console.log(res.data[0]);
        const doctorName = res.data[0].name;
        axios.post(`http://localhost:5000/api/notifications/`, {
          receiverId: receiverId,
          text: `${doctorName} confirmed your appointment.`,
          read: false,
        });
        //for real time effect on receiver end
        // socket.current.emit("sendNotification", {
        //   receiverId: receiverId,
        //   text: `${doctorName} confirmed your appointment.`,
        //   read: false,
        // });
      });
    //canceling all other appointments on current time
    axios
      .get(`http://localhost:5000/api/appointment/getByAppointmentId/${id}`)
      .then((res) => {
        //confirm appointment is res.data
        console.log("confiremdAppointment>>>", res.data);
        let confirmedAppointmentTime =
          parseInt(res.data.appointmentTime.slice(0, 2)) * 60 +
          parseInt(res.data.appointmentTime.slice(3, 5));
        //getting specific pending appoitments
        axios
          .post("http://localhost:5000/api/appointment/specificAppointments", {
            doctorId: res.data.doctorId,
            status: "Pending",
            date: res.data.appointmentDate,
          })
          .then((res2) => {
            //console.log("specific pending appointments ", res2.data);
            const appointments = res2.data;
            appointments.map((appointment) => {
              let appointmentTime =
                parseInt(appointment.appointmentTime.slice(0, 2)) * 60 +
                parseInt(appointment.appointmentTime.slice(3, 5));

              //console.log("appointmentTime > ", appointmentTime);
              if (
                appointmentTime - confirmedAppointmentTime < 30 &&
                appointmentTime - confirmedAppointmentTime > -30
              ) {
                //console.log("deleting....", appointment);
                cancelAppointment(
                  appointment._id,
                  appointment.userId,
                  appointment.doctorId
                );
              }
            });
          });
      });
  };

  const cancelAppointment = async (id, receiverId, doctorId) => {
    try {
      const data = {
        appointmentId: id,
        status: "Canceled",
      };
      const res = await axios.put(
        `http://localhost:5000/api/appointment/update`,
        data
      );
      setappointmentApplications(
        appointmentApplications.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
    //sending notification
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + doctorId)
      .then((res) => {
        console.log(res.data[0]);
        const doctorName = res.data[0].name;
        axios.post(`http://localhost:5000/api/notifications/`, {
          receiverId: receiverId,
          text: `${doctorName} cancelled your appointment.`,
          read: false,
        });
        //for real time effect on receiver end
        // socket.current.emit("sendNotification", {
        //   receiverId: receiverId,
        //   text: `${doctorName} cancelled your appointment.`,
        //   read: false,
        // });
      });
  };
  const messageThePatient = (e, patientId, doctorId) => {
    e.preventDefault();

    const sender = doctorId;
    const receiver = patientId;

    //checking that conversation already exists or not

    dispatch({
      type: "SET_CREATE_CONV_INFO",

      senderId: sender,
      receiverId: receiver,
      createConversation: false,
    });

    ////////////////////

    // console.log("createConvInfo: ", senderId, receiverId);
    // console.log("Message doc: ", sender, receiver);

    /**********redirect to messenger */
    history.push("/messenger");
  };
  //console.log("ongoing appointment>>>>>>>>>>>>>>>>>>>> ",ongoingAppointment)
  const deleteAppointment = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/appointment/delete/${id}`
      );
      setAttendedAppointments(
        attendedAppointments.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <>
      {/*<Sidebar />*/}
      <Navbar />
      <div className="doctorAppointmentNav">
        <div
          className={contentType === 1 && `selected`}
          onClick={() => setContentType(1)}
        >
          Applications
        </div>
        <div
          className={contentType === 2 && `selected`}
          onClick={() => setContentType(2)}
        >
          Upcoming appointments
        </div>
        <div
          className={contentType === 3 && `selected`}
          onClick={() => setContentType(3)}
        >
          Ongoing appointments
        </div>
        <div
          className={contentType === 4 && `selected`}
          onClick={() => setContentType(4)}
        >
          Attended appointments
        </div>
      </div>
      <div className="doctor__appointments docSide">
        <div className="confirmed__appointments__container">
          {contentType === 1 ? (
            <>
              <h1 className="doctor__appointments__h1">Applications</h1>
              <div className="confirmed__appointments__list">
                {appointmentApplications &&
                appointmentApplications.length > 0 ? (
                  <table>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                    {appointmentApplications.map((item) => {
                      // console.log("appointments item>>>>", item);
                      return (
                        <tr className="confirmed__appointments__row">
                          <td>{item.title}</td>
                          <td className="confirmed__description">
                            {item.description}
                          </td>
                          <td>
                            {new Date(item.appointmentDate).toDateString()}
                          </td>
                          <td>{item.appointmentTime}</td>
                          <td
                            className="confirmed__status"
                            style={{ color: "yellowgreen" }}
                          >
                            {item.status}
                          </td>
                          <td className="doctor__confirm">
                            <button
                              onClick={() =>
                                confirmAppointment(
                                  item._id,
                                  item.userId,
                                  item.doctorId
                                )
                              }
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() =>
                                cancelAppointment(
                                  item._id,
                                  item.userId,
                                  item.doctorId
                                )
                              }
                              style={{ marginLeft: 10 }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={(e) =>
                                messageThePatient(e, item.userId, item.doctorId)
                              }
                              style={{ marginLeft: 10 }}
                              className="contactBtn"
                            >
                              Contact Patient
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                ) : (
                  <div className="confirmed__empty">
                    <h1>No Pending Applications</h1>
                  </div>
                )}
              </div>
            </>
          ) : contentType === 2 ? (
            <>
              <h1 className="doctor__appointments__h1">
                Upcoming Appointments
              </h1>
              <div className="confirmed__appointments__list">
                {upcomingAppointments && upcomingAppointments.length > 0 ? (
                  <table>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>User Rating</th>
                    </tr>

                    {upcomingAppointments.map((item) => {
                      // console.log("appointments item>>>>", item);
                      return (
                        <tr className="confirmed__appointments__row">
                          <td>{item.title}</td>
                          <td className="confirmed__description">
                            {item.description}
                          </td>
                          <td>
                            {new Date(item.appointmentDate).toDateString()}
                          </td>
                          <td>{item.appointmentTime}</td>
                          <td
                            className="confirmed__status"
                            style={{ color: "yellowgreen" }}
                          >
                            {item.status}
                          </td>
                          <td className="doctor__confirm">
                            <button
                              onClick={(e) =>
                                messageThePatient(e, item.userId, item.doctorId)
                              }
                              style={{ marginLeft: 10 }}
                              className="contactBtn"
                            >
                              Contact Patient
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </table>
                ) : (
                  <div className="confirmed__empty">
                    <h1>No Upcoming Appointments to attend</h1>
                  </div>
                )}
              </div>
            </>
          ) : contentType === 3 ? (
            <>
              <h1 className="doctor__appointments__h1">Ongoing Appointment</h1>
              <div
                className="confirmed__appointments__list"
                style={{ width: "90vw", paddingLeft: "5vw" }}
              >
                {ongoingAppointment ? (
                  <OngoingAppointment appointment={ongoingAppointment} />
                ) : (
                  <div className="confirmed__empty">
                    <h1>No Ongoing Appointment</h1>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <h1 className="doctor__appointments__h1">
                Attended Appointments
              </h1>
              <div className="confirmed__appointments__list">
                {attendedAppointments && attendedAppointments?.length > 0 ? (
                  <table>
                    <tr>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>User Rating</th>
                    </tr>

                    {attendedAppointments?.map((item) => {
                      // console.log("appointments item>>>>", item);

                      return (
                        <tr className="confirmed__appointments__row">
                          <td>{item?.title}</td>
                          <td className="confirmed__description">
                            {item?.description}
                          </td>
                          <td>
                            {new Date(item?.appointmentDate).toDateString()}
                          </td>
                          <td>{item?.appointmentTime}</td>
                          <td
                            className="confirmed__status"
                            style={{ color: "yellowgreen" }}
                          >
                            {item?.status}
                          </td>
                          <td className="confirmed__button">
                            {/* <button onClick={() => deleteAppointment(item._id)}>
                              Delete
                            </button> */}
                            {/* user rating */}
                            {item?.ratingByUser &&
                            item?.ratingByUser !== "no rating" ? (
                              <p style={{ float: "left" }}>
                                {console.log(
                                  "item.ratingByUser>>>",
                                  item?.ratingByUser
                                )}
                                {Array(parseInt(parseFloat(item?.ratingByUser)))
                                  .fill()
                                  .map((_, i) => (
                                    <span style={{ width: "maxContent" }}>
                                      <StarIcon style={{ color: "golden" }} />
                                    </span>
                                  ))}
                              </p>
                            ) : (
                              <p>no rating</p>
                            )}
                          </td>
                          {/* <td className="doctor__confirm">
                            <button
                              onClick={(e) =>
                                messageThePatient(e, item.userId, item.doctorId)
                              }
                              style={{ marginLeft: 10 }}
                              className="confirmed__button"
                            >
                              Contact Patient
                            </button>
                            
                          </td> */}
                        </tr>
                      );
                    })}
                  </table>
                ) : (
                  <div className="confirmed__empty">
                    <h1>No Attended Appointments yet.</h1>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorAppointments;
