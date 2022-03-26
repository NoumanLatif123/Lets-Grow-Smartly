import React from 'react';
import * as FaIcons from "react-icons/fa";
import * as BiIcons from "react-icons/bi";
import * as GiIcons from "react-icons/gi";
import * as ImIcons from "react-icons/im";
import {IconContext} from 'react-icons';
import './progress.css' ;

function ProgressCard() {
    return (
        <>
        <IconContext.Provider value={{size: 32, color: 'lightgrey'}}>
        <div className="progression-card">
            <ul>
                <li><h4 className="pending">{/*<BiIcons.BiTime className='fas-pending'/>*/}Pending Appointment</h4></li>
                <li><h4 className="confirmed">{/*<GiIcons.GiConfirmed className='fas-confirmed' />*/}Confirmed Appointment</h4></li>
                <li><h4 className="cancelled">{/*<ImIcons.ImCancelCircle className='fas-cancelled'/>*/}Cancelled Appointment</h4></li>
                <li><h4 className="attended">{/*<FaIcons.FaRegCalendarCheck className='fas-attend'/>*/}Attended Appointment</h4></li>
            </ul>
        </div>
        </IconContext.Provider>
        </>
        )
    };

export default ProgressCard
