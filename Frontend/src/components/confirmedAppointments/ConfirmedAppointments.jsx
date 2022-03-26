import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import './confirmedApp.css'

const ConfirmedAppointments = () => {
    const [confirmedApp, setConfirmedApp] = useState([])
    const {user} = useContext(AuthContext)
    console.log('confirmed', user.id)

    useEffect(async() => {
        try {
            const status = {status: 'Confirmed'}
            const appointments = await axios.post(`http://localhost:5000/api/appointment/${user.id}`, status) 
            console.log('confirmed app:',appointments.data)
            setConfirmedApp(appointments.data)
        } catch (error) {
            console.log(error.message)
        }
    }, [])

    return (
        <div className='confirmed__appointments__container'>
            
            <div className='confirmed__appointments__list'>
            {
                confirmedApp && confirmedApp.length > 0 ?
                <>
                <p className='confirmed__appointments__length'>
                    Confirmed &nbsp; &nbsp;<p>( {confirmedApp.length} Appointments )</p>
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
                        confirmedApp.map(item => {
                            return(
                                <tr className='confirmed__appointments__row'>
                                    <td>{item.title}</td>
                                    <td className='confirmed__description'>{item.description}</td>
                                    <td>{new Date(item.appointmentDate).toDateString()}</td>
                                    <td>{item.appointmentTime}</td>
                                    <td className='confirmed__status'>{item.status}</td>
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
                    <h1>No Confirmed Appointments</h1>
                </div>
            }
            </div>
        </div>
    )
}

export default ConfirmedAppointments
