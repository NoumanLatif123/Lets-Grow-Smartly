import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import "../confirmedAppointments/confirmedApp.css";
const AttentedAppointments = () => {
  const [attentedApp, setAttentedApp] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(async () => {
    try {
      const status = { status: "Attented" };
      const appointments = await axios.post(
        `http://localhost:5000/api/appointment/${user.id}`,
        status
      );
      setAttentedApp(appointments.data);
      console.log(appointments.data);
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

  return (
    <div className="confirmed__appointments__container">
      <div className="confirmed__appointments__list">
        {attentedApp && attentedApp.length > 0 ? (
          <>
            <p className="confirmed__appointments__length">
              Attended &nbsp; &nbsp;<p>( {attentedApp.length} Appointments )</p>
            </p>
            <table>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>

              {attentedApp.map((item) => {
                return (
                  <tr className="confirmed__appointments__row">
                    <td>{item.title}</td>
                    <td className="confirmed__description">
                      {item.description}
                    </td>
                    <td>{new Date(item.appointmentDate).toDateString()}</td>
                    <td>{item.appointmentTime}</td>
                    <td className="confirmed__status">{item.status}</td>
                    <td className="confirmed__button">
                      <button onClick={() => deleteAppointMent(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </>
        ) : (
          <div className="confirmed__empty">
            <h1>No Attented Appointments</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default AttentedAppointments;
