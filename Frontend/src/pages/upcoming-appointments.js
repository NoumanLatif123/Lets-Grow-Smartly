import React from 'react'
import '../CSS/pastappointment.css';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Footer1 from '../components/Footer/footer';

function UpcomingAppointments() {
    
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
            <h6>UPCOMING &nbsp;APPOINTMENTS</h6>
        </div>
        <div className="lower-appointment">
            <h6>Upcoming Recent Appointments &nbsp; &nbsp;<p>( 6 Appointments )</p></h6> 
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
                                <h3>Appointment Time</h3>
                                <h3>Rating</h3>
                                </td>
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
            {/*
            <div className="pagination">
                <Link to="./past-appointments" className="sec">1</Link>
                <Link to="./past-appointments" className="sec">2</Link>
                <Link to="./past-appointments" className="sec">3</Link>
                <Link to="./past-appointments" className="sec">4</Link>
                <Link to="./past-appointments" className="sec">5</Link>
                <Link to="./past-appointments" className="sec">6</Link>
            </div>
            */}
        </div>
        </div>
        <Footer1 />
    </>
    )
}

export default UpcomingAppointments