import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
//import swal from 'sweetalert';
//import ProgressCard from '../components/ProgressCard/progress-card';
//import Footer1 from '../components/Footer/footer';
import "./dashboard.css";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import LoadinIndicator from "../components/LoadingIndicator/LoadingIndicator";
import ConfirmedAppointments from "../components/confirmedAppointments/ConfirmedAppointments";
import CanceledAppointments from "../components/canceledAppointments/CanceledAppointments";
import AttentedAppointments from "../components/attentedAppointments/AttentedAppointments";
import PendingIcon from "@mui/icons-material/Pending";
import CheckIcon from "@mui/icons-material/Check";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import Footer1 from "../components/Footer/footer";
import OngoingAppointment from "../components/ongoingAppointment/OngoingAppointment";
import BookAppointments from "../pages/Book Appointments/book-appointments";
import * as FaIcons from "react-icons/fa";
import * as ImIcons from "react-icons/im";

function Dashboard() {
  const [options, setOptions] = useState(5);
  const { user } = useContext(AuthContext);
  //console.log("dashboard: ", user.id);
  const [pendingAppointments, setPendingAppointments] = useState([]);
  const [isCancelingAppointment, setIsCancellingAppointment] = useState(false);
  const [confirmedApp, setConfirmedApp] = useState([]);
  const [canceledApp, setCanceledApp] = useState([]);
  const [attentedApp, setAttentedApp] = useState([]);
  const [ongoingAppointment, setOngoingAppointment] = useState();
  const [isEditingTheAppointment, setIsEditingTheAppointment] = useState(false);
  const [editAppointmentId, setEditAppointmentId] = useState("");

  useEffect(async () => {
    try {
      const status = { status: "Pending" };
      const appointments = await axios.post(
        `http://localhost:5000/api/appointment/${user.id}`,
        status
      );
      //console.log("appointments:", appointments);
      setPendingAppointments(appointments.data);
      //setting ongoing appointment
      let currentDate = new Date(Date.now());
      currentDate.setHours(0, 0, 0, 0);
      const body = {
        userId: user.id,
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
              //console.log("timeInMinutes", timeInMinutes);
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
  }, [options]);

  const cancelAppointment = async (id) => {
    try {
      setIsCancellingAppointment(true);
      const body = {
        appointmentId: id,
        status: "Canceled",
      };
      console.log("body:", body);
      const appointment = await axios.put(
        "http://localhost:5000/api/appointment/update",
        body
      );
      setPendingAppointments(
        pendingAppointments.filter((item) => item._id !== id)
      );
      setIsCancellingAppointment(false);
      console.log("canceled:", appointment);
    } catch (error) {
      console.log(error.message);
      setIsCancellingAppointment(false);
    }
  };
  useEffect(async () => {
    try {
      const status = { status: "Confirmed" };
      const appointments = await axios.post(
        `http://localhost:5000/api/appointment/${user.id}`,
        status
      );
      // console.log("confirmed app:", appointments.data);
      setConfirmedApp(appointments.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const status = { status: "Canceled" };
      const appointments = await axios.post(
        `http://localhost:5000/api/appointment/${user.id}`,
        status
      );
      setCanceledApp(appointments.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(async () => {
    try {
      const status = { status: "Attented" };
      const appointments = await axios.post(
        `http://localhost:5000/api/appointment/${user.id}`,
        status
      );
      setAttentedApp(appointments.data);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const deleteAppointMent = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/appointment/delete/${id}`
      );
      setAttentedApp(attentedApp.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error.message);
    }
  };
  const editTheAppointment = (id) => {
    console.log("editing>>>>>>>>>>>>>>", id);
    setIsEditingTheAppointment(true);
    setEditAppointmentId(id);
  };
  return (
    <>
      <Sidebar setOptions={setOptions} />
      {isEditingTheAppointment === true ? (
        <BookAppointments
          isEdit={isEditingTheAppointment}
          appointmentId={editAppointmentId}
        />
      ) : (
        <div className="dashboard">
          <div className="dashboard__container">
            <div className="dashboard__container__options">
              <ul className="dashboard__container__options__list">
                <li
                  onClick={() => setOptions(1)}
                  className={
                    options === 1 ? "list__item__selected" : "list__items"
                  }
                >
                  <div>
                    <h1 className="counter_para">
                      {pendingAppointments && pendingAppointments.length}
                    </h1>
                    <p>Pending Appointments</p>
                  </div>
                  {/* <PendingIcon /> */}
                  <FaIcons.FaClock
                    style={{ fontSize: "3rem", paddingRight: "10px" }}
                  />
                </li>
                <li
                  onClick={() => setOptions(2)}
                  className={
                    options === 2 ? "list__item__selected" : "list__items"
                  }
                >
                  <div>
                    <h1 className="counter_para">
                      {confirmedApp && confirmedApp.length}
                    </h1>
                    <p>Confirmed Appointments</p>
                  </div>
                  {/* <CheckIcon /> */}
                  <FaIcons.FaRegCalendarCheck
                    style={{ fontSize: "3rem", paddingRight: "10px" }}
                  />
                </li>
                <li
                  onClick={() => setOptions(3)}
                  className={
                    options === 3 ? "list__item__selected" : "list__items"
                  }
                >
                  <div>
                    <h1 className="counter_para">
                      {canceledApp && canceledApp.length}
                    </h1>
                    <p>Cancelled Appintments</p>
                  </div>
                  {/* <CancelPresentationIcon /> */}
                  <ImIcons.ImCross
                    style={{ fontSize: "3rem", paddingRight: "10px" }}
                  />
                </li>
                <li
                  className={
                    options === 4 ? "list__item__selected" : "list__items"
                  }
                  onClick={() => setOptions(4)}
                >
                  <div>
                    <h1 className="counter_para">
                      {attentedApp && attentedApp.length}
                    </h1>
                    <p>Attended Appointments</p>
                  </div>
                  {/* <ThumbUpAltIcon /> */}
                  <FaIcons.FaRegClipboard
                    style={{ fontSize: "3rem", paddingRight: "10px" }}
                  />
                </li>
                <li
                  onClick={() => setOptions(5)}
                  className={
                    options === 5 ? "list__item__selected" : "list__items"
                  }
                >
                  <div>
                    <h1 className="counter_para">
                      {ongoingAppointment ? " 1 " : "No"}
                    </h1>
                    <p>Ongoing Appointment</p>
                  </div>
                  {/* <PendingIcon /> */}
                  <FaIcons.FaCamera
                    style={{ fontSize: "3rem", paddingRight: "10px" }}
                  />
                </li>
              </ul>
            </div>
            {options === 1 &&
            pendingAppointments &&
            pendingAppointments.length > 0 ? (
              <div className="pending__appointments">
                <p className="pending__appointments__length">
                  Pending &nbsp; &nbsp;
                  <p>( {pendingAppointments.length} Appointments )</p>
                </p>
                <div className="pending__appointments__container">
                  {pendingAppointments.map((appointment) => {
                    return (
                      <div className="pending__appointments__container__item">
                        <div className="pending__appointments__container__item__title">
                          <label>Title </label>
                          <p>{appointment.title}</p>
                        </div>

                        <div className="appointment__description">
                          <label>Description</label>
                          <p>
                            {appointment.description
                              ? appointment.description
                              : "No Description provided"}
                          </p>
                        </div>

                        <div className="appointments__date-time">
                          <p>
                            {" "}
                            {new Date(
                              appointment.appointmentDate
                            ).toDateString()}
                          </p>
                          <p>{appointment.appointmentTime}</p>
                        </div>

                        <div className="appointments__edit__cancel__button">
                          <button
                            className="appointments__cancel__button"
                            onClick={() => editTheAppointment(appointment._id)}
                          >
                            {isCancelingAppointment ? (
                              <LoadinIndicator />
                            ) : (
                              "Edit"
                            )}
                          </button>
                          <button
                            className="appointments__cancel__button"
                            onClick={() => cancelAppointment(appointment._id)}
                          >
                            {isCancelingAppointment ? (
                              <LoadinIndicator />
                            ) : (
                              "Cancel"
                            )}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              options === 1 && (
                <div className="pending__appointments__empty">
                  <h1>No Pending Appointments</h1>
                </div>
              )
            )}

            {options === 2 && (
              <div style={{ width: "100%" }}>
                <ConfirmedAppointments />
              </div>
            )}
            {options === 3 && (
              <div style={{ width: "100%" }}>
                <CanceledAppointments />
              </div>
            )}
            {options === 4 && (
              <div style={{ width: "100%" }}>
                <AttentedAppointments />
              </div>
            )}
            {options === 5 &&
              (ongoingAppointment ? (
                <div className="ongoingAppointmentContainer">
                  <OngoingAppointment appointment={ongoingAppointment} />
                </div>
              ) : (
                <div className="confirmed__empty">
                  <h1>No Ongoing Appointment</h1>
                </div>
              ))}
          </div>
        </div>
      )}

      <Footer1 />
    </>
  );
}

export default Dashboard;
