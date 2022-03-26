import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import '../confirmedAppointments/confirmedApp.css'
const CanceledAppointments = () => {
    const [canceledApp, setCanceledApp] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(async() => {
        try {
            const status = {status: 'Canceled'}
            const appointments = await axios.post(`http://localhost:5000/api/appointment/${user.id}`, status) 
            setCanceledApp(appointments.data)
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <div className='confirmed__appointments__container'>
            <div className='confirmed__appointments__list'>
            {
                canceledApp && canceledApp.length > 0 ?
                <>
                <p className='confirmed__appointments__length'>
                    Cancelled &nbsp; &nbsp;<p>( {canceledApp.length} Appointments )</p>
                </p>
                
                <table>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Status</th>
                        {/* <th>Actions</th> */}
                        </tr>

                        {
                            canceledApp.map(item => {
                                return(
                                    <tr className='confirmed__appointments__row'>
                                        <td>{item.title}</td>
                                        <td className='confirmed__description'>{item.description ? item.description: 'No Description'}</td>
                                        <td>{new Date(item.appointmentDate).toDateString()}</td>
                                        <td>{item.appointmentTime}</td>
                                        <td className='confirmed__status' style={{color: 'red'}}>{item.status}</td>
                                        {/* <td className='confirmed__button'>
                                            <button>Confirm</button>
                                        </td> */}
                                    </tr>
                                )
                            }) }
                    </table>
                </>
                :
                <div className='confirmed__empty'>
                    <h1>No Canceled Appointments</h1>
                </div>
            }
            </div>
        </div>
    )

}

export default CanceledAppointments
