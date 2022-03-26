import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import "./Admin.css";

const Admin = () => {
  const { user } = useContext(AuthContext);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [refreshMsgs, setRefreshMsgs] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/getUserBy?userId=" + user?.id)
      .then((res) => {
        user.picture = res.data[0].picture;
        user.isAdmin = res.data[0].isAdmin;
        // console.log(user>.picture);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/specialists")
      .then((res) => {
        let specialists = res.data;
        let pendingSpecialists = specialists.filter((specialist) => {
          return specialist?.approvalStatus === "pending";
        });
        setPendingApplications(pendingSpecialists);
        //console.log("pending applications>>> ", pendingApplications);
      })
      .catch((error) => {
        alert("Server Error");
      });
  }, [refreshMsgs]);
  //console.log("specialist>>> ", specialists);
  const acceptRegistrationRequest = (specialistId) => {
    //console.log("accepting ", specialistId);
    const data = {
      userId: specialistId,
      approvalStatus: "accepted",
    };
    axios.put(`http://localhost:5000/api/users/updateApprovalStatus`, data);
    setRefreshMsgs(Math.floor(Math.random() * 56));
  };
  const rejectRegistrationRequest = (specialistId) => {
    console.log("rejecting ", specialistId);
    const data = {
      userId: specialistId,
      approvalStatus: "rejected",
    };
    axios.put(`http://localhost:5000/api/users/updateApprovalStatus`, data);
    //deleting user
    axios.delete(`http://localhost:5000/api/users/deleteUser/${specialistId}`);
    setRefreshMsgs(Math.floor(Math.random() * 56));
  };
  return (
    <>
      <Navbar />
      <div className="specialist__applications">
        <div className="confirmed__applications__container">
          <h1 className="specialist__applications__h1">
            Specialists Registeration Applications
          </h1>
          <div className="confirmed__applications__list">
            {pendingApplications && pendingApplications.length > 0 ? (
              <table>
                <tr>
                  <th>Applicant Name</th>
                  <th>Qualification</th>
                  <th>Date</th>
                  <th>Certificate</th>
                  <th>Application Status</th>
                  <th>Actions</th>
                </tr>

                {pendingApplications.map((item) => {
                  //console.log("applications item>>>>", item);
                  return (
                    <tr className="confirmed__applications__row">
                      <td>{item.name}</td>
                      <td className="confirmed__description">
                        {item.qualification}
                      </td>
                      <td>{new Date(item.createdAt).toDateString()}</td>
                      <td>
                        <a href={item?.certificateImg}>
                          <img
                            src={
                              item?.certificateImg
                                ? item?.certificateImg
                                : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"
                            }
                          />
                        </a>
                      </td>
                      <td
                        className="confirmed__status"
                        style={{ color: "yellowgreen" }}
                      >
                        {item.approvalStatus}
                      </td>
                      <td className="specialist__confirm">
                        <button
                          onClick={() => acceptRegistrationRequest(item._id)}
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => rejectRegistrationRequest(item._id)}
                          style={{ marginLeft: 10 }}
                        >
                          Reject
                        </button>
                        {/* <button
                          onClick={(e) =>
                            messageThePatient(e, item.userId, item.doctorId)
                          }
                          style={{ marginLeft: 10 }}
                        >
                          Contact Patient
                        </button> */}
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
        </div>
      </div>
    </>
  );
};

export default Admin;
