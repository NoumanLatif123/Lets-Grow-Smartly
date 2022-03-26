import React, {useState} from 'react'
import swal from 'sweetalert';
import './card.css';

function Card(props) {
    
    const confirm=() =>{
        swal("Good job!", "Your appointment has confirmed now!", "success")
    };
    const cancel=() =>{
        swal({
            title: "Are you sure?",
            text: "Once you clicked on OK, Your Appointment will be removed!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
        .then((willDelete) => {
            if (willDelete) {
            swal("Poof! Your Appointment has been removed!", {
            icon: "success",
        });
    }
        else {
        swal("Your appointment is safe!");
    }
})
};
    return (
        <>
        <section className="confirm-cancel">
            <div className="card">
                <div className="card-image"><h2>Title</h2><p>Text</p>
                </div>
                            
                <div className="content">
                    <p><i className="far fa-calendar-check"></i>Selected Date
                    <i className="far fa-clock"></i>Selected Time</p>
                    <h6> {props.appointmentDate} <span> {props.appointmentTime}  </span></h6>
                </div>
                        
                <button className="confirm" id="confirm" onClick={() => confirm()}>
                    <i className="far fa-check-circle"></i>Confirm</button>
                            
                <button className="cancel" onClick={() => cancel()}>
                    <i className="far fa-times-circle"></i>Cancel</button>
            </div>
        </section>
        </>
    )
}

export default Card
