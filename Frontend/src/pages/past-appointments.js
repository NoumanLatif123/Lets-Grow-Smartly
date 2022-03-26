import React from 'react'
import '../CSS/pastappointment.css';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer1 from '../components/Footer/footer';

function PastAppointments() {
    return (
    <>
    <Sidebar />
    {/*<div className="lower-navbar">
        <h5>Past Appointments</h5>
        <h6>View Past Appointments with respective Child Specialists</h6>
    </div>
    */}
    <div className="appointment">
        <div className="upper-appointment">
            <h6>PAST &nbsp;APPOINTMENTS</h6>
        </div>
        <div className="lower-appointment">
            <h6>Recent Attended Appointments &nbsp; &nbsp;<p>( 6 Appointments )</p></h6> 
            <div className="upcoming-past">
                <table>
                    <tr>
                        <td ><Link to="./past-appointments"><button className="upcoming">A Day Ago</button></Link></td>
                        <td><Link to="./past-appointments"><button className="past">Week Ago</button></Link></td>
                    </tr>
                </table>
            </div>
            <div className="Box">
                <div className="outer-box">
                    <h2>Recent Visits</h2>
                    <section className="inner-box">
                        <table>
                            <tr>
                                <td><h3>No.</h3>
                                <h3>Assigned Doctor</h3>
                                <h3>Date of Appointment</h3>
                                <h3>Duration</h3>
                                <h3>Assigned Rating</h3></td>
                            </tr>
                            <tr><td className="line"></td></tr>
                            <tr><td><div className="recent"></div></td></tr>
                            <tr><td><div className="recent"></div></td></tr>
                            <tr><td><div className="recent"></div></td></tr>
                            <tr><td><div className="recent"></div></td></tr>
                        </table>
                    </section>
                </div>
            </div>
        </div>
        </div>
        <Footer1 />
    </>
    )
}

export default PastAppointments